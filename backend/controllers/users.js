
const getUserTeams = db => (req, res) => {
  const userId = req.params.userId;
  db.select('teams.*')
    .from('teams')
    .innerJoin('team_members', 'team_members.team_id', '=', 'teams.team_id')
    .where('team_members.user_id', '=', userId)
    .then(teams => {
      res.json(teams)
    })
}

const getUserPostVotes = db => (req, res) => {
  const { userId } = req.params;
  db.select('*')
    .from('post_votes')
    .where('user_id', '=', userId)
    .then(votes => {
      res.json(votes)
    })
}

const getUserCommentVotes = db => (req, res) => {
  const { userId } = req.params;
  db.select('*')
    .from('comment_votes')
    .where('user_id', '=', userId)
    .then(votes => {
      res.json(votes)
    })
}

module.exports = {
  getUserTeams: getUserTeams,
  getUserPostVotes: getUserPostVotes,
  getUserCommentVotes: getUserCommentVotes,
}
