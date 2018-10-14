const knex = require('knex');

const hasAlreadyVoted = (db, userId, postId) => {
  return db.select('*')
    .from('post_votes')
    .where({
      user_id: userId,
      post_id: postId
    })
    .then(entry => {
      if (entry.length > 0) {
        return entry[0].user_vote;
      } else {
        return undefined;
      }
    })
}

const updateVote = (db, userId, postId, currentVote, newVote, res) => {
  db.transaction(trx => {
    trx('post_votes')
      .where({
        user_id: userId,
        post_id: postId
      })
      .update({
        user_vote: newVote
      })
      .then(() => {
        if (currentVote === true && newVote === false) {
          return trx('posts').where('post_id', '=', postId)
            .update({
              'upvotes': db.raw('upvotes - 1'),
              'downvotes': db.raw('downvotes + 1')
            })
            .returning('*')
            .then(post => {
              res.json(post[0]);
            })
        } else if (currentVote === false && newVote === true) {
          return trx('posts').where('post_id', '=', postId)
            .update({
              'upvotes': db.raw('upvotes + 1'),
              'downvotes': db.raw('downvotes - 1')
            })
            .returning('*')
            .then(post => {
              res.json(post[0]);
            })
        } else if (currentVote === true && newVote === null) {
          return trx('posts').where('post_id', '=', postId)
            .update({
              'upvotes': db.raw('upvotes - 1')
            })
            .returning('*')
            .then(post => {
              res.json(post[0]);
            })
        } else if (currentVote === false && newVote === null) {
          return trx('posts').where('post_id', '=', postId)
            .update({
              'downvotes': db.raw('downvotes - 1')
            })
            .returning('*')
            .then(post => {
              res.json(post[0]);
            })
        } else if (currentVote === null && newVote === true) {
          return trx('posts').where('post_id', '=', postId)
            .update({
              'upvotes': db.raw('upvotes + 1')
            })
            .returning('*')
            .then(post => {
              res.json(post[0]);
            })
        } else if (currentVote === null && newVote === false) {
          return trx('posts').where('post_id', '=', postId)
            .update({
              'downvotes': db.raw('downvotes + 1')
            })
            .returning('*')
            .then(post => {
              res.json(post[0]);
            })
        } else {
          res.status(400).json('Cannot vote twice')
        }
      })
      .then(trx.commit)
      .then(trx.rollback)
  })
}

const makeNewVote = (db, userId, postId, newVote, res) => {
  if (newVote === true) {
    db.insert({
      user_id: userId,
      post_id: postId,
      user_vote: newVote,
      time_voted: new Date()
    })
    .into('post_votes')
    .then(() => {
      db('posts')
        .where({
          user_id: userId,
          post_id: postId
        })
        .increment('upvotes', 1)
        .returning('*')
        .then(post => {
          res.json(post[0]);
        })
    })
  } else if (newVote === false) {
    db.insert({
      user_id: userId,
      post_id: postId,
      user_vote: newVote,
      time_voted: new Date()
    })
    .into('post_votes')
    .then(() => {
      db('posts')
        .where({
          user_id: userId,
          post_id: postId
        })
        .increment('downvotes', 1)
        .returning('*')
        .then(post => {
          res.json(post[0]);
        })
    })
  } else {
    res.status(400).json('No previous vote recorded');
  }
}

const voteOnPost = db => (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;
  const { dir } = req.query;
  console.log(userId, postId, dir);

  let newVote;
  if (dir === '1') {
    newVote = true;
  } else if (dir === '-1') {
    newVote = false;
  } else if (dir === '0') {
    newVote = null;
  }

  // check if they have already voted
  hasAlreadyVoted(db, userId, postId).then(currentVote => {
    if (currentVote === undefined) {
      console.log('making new vote');
      makeNewVote(db, userId, postId, newVote, res);
    } else {
      console.log('updating vote');
      updateVote(db, userId, postId, currentVote, newVote, res);
    }
  })

}

module.exports = {
  voteOnPost: voteOnPost
}
