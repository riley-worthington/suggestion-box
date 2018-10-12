
const getUserTeams = db => (req, res) => {
  const userId = req.params.userId;
  db.select('teams.*')
    .from('teams')
    .innerJoin('team_members', 'team_members.team_id', '=', 'teams.team_id')
    .where('team_members.user_id', '=', userId)
    .then(teamIds => {
      res.json(teamIds)
    })
}

module.exports = {
  getUserTeams: getUserTeams
}
