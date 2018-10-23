
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
    .returning('team_id')
    .then(team_id => {
      return trx('teams')
        .select('*')
        .where('team_id', '=', team_id[0])
        .then(team => {
          res.json(team[0])
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to add team member'))
}

const getTeamMembers = db => (req, res) => {
  const teamId = req.params.teamId;
  db.select('users.first_name', 'users.last_name', 'users.user_id')
    .from('users')
    .innerJoin('team_members', 'team_members.user_id', '=', 'users.user_id')
    .where('team_members.team_id', '=', teamId)
    .then(members => {
      res.json(members)
    })
}

const getAllTeams = db => (req, res) => {
  db.select('*')
    .from('teams')
    .then(teams => {
      res.json(teams)
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
  createNewTeam: createNewTeam,
  addTeamMember: addTeamMember,
  getTeamMembers: getTeamMembers,
  getAllTeams: getAllTeams,
}
