
const createNewTeam = db => (req, res) => {
  const { adminId, name } = req.body;
  const date_created = new Date();
  db.transaction(trx => {
    trx.insert({
      admin: adminId,
      name: name,
      date_created: date_created
    })
    .into('teams')
    .returning('*')
    .then(team => {
      res.status(201).json(team[0]);
      return trx('team_members')
        .insert({
          user_id: adminId,
          team_id: team[0]['team_id'],
          date_joined: date_created
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to create team'));
}

const addTeamMember = db => (req, res) => {
  const { userId } = req.body;
  const teamId = req.params.teamId;
  db.transaction(trx => {
    trx.insert({
      user_id: userId,
      team_id: teamId,
      date_joined: new Date()
    })
    .into('team_members')
    .returning('*')
    .then(data => {
      res.status(201).json(data[0])
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to add team member'))
}

module.exports = {
  createNewTeam: createNewTeam,
  addTeamMember: addTeamMember
}
