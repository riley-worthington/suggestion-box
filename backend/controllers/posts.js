
const createNewPost = db => (req, res) => {
  const { userId, teamId, title, content } = req.body;
  db.transaction(trx => {
    trx.insert({
      user_id: userId,
      team_id: teamId,
      title: title,
      content: content,
      time_posted: new Date()
    })
    .into('posts')
    .returning('*')
    .then(post => {
      res.json(post[0]);
      return trx('team_posts')
        .insert({
          post_id: post[0]['post_id'],
          team_id: teamId
        })
    })
    // .then(post => {
    //   res.json(post[0])
    // })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to create post'));
}

const getPosts = db => (req, res) => {
  const teamId = req.params.teamId;
  db.select('*').from('posts').where('team_id', '=', teamId)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => res.status(400).json('error getting posts'));
}

module.exports = {
  createNewPost: createNewPost,
  getPosts: getPosts
}
