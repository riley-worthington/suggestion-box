const knex = require('knex');

const POST = 'POST';
const COMMENT = 'COMMENT';

const hasAlreadyVoted = (db, userId, assetId, assetType) => {
  let votesTable, idLabel;
  if (assetType === POST) {
    votesTable = 'post_votes';
    idLabel = 'post_id';
  } else if (assetType === COMMENT) {
    votesTable = 'comment_votes';
    idLabel = 'comment_id';
  }

  return db.select('*')
    .from(votesTable)
    .where({
      user_id: userId,
      [idLabel]: assetId
    })
    .then(entry => {
      if (entry.length > 0) {
        return entry[0].user_vote;
      } else {
        return undefined;
      }
    })
}

const updateVote = (db, userId, assetId, assetType, currentVote, newVote, res) => {
  let votesTable, dbName, idLabel;
  if (assetType === POST) {
    votesTable = 'post_votes';
    dbName = 'posts';
    idLabel = 'post_id';
  } else if (assetType === COMMENT) {
    votesTable = 'comment_votes';
    dbName = 'comments';
    idLabel = 'comment_id';
  }

  db.transaction(trx => {
    trx(votesTable)
      .where({
        user_id: userId,
        [idLabel]: assetId
      })
      .update({
        user_vote: newVote
      })
      .then(() => {
        if (currentVote === true && newVote === false) {
          return trx(dbName).where(idLabel, '=', assetId)
            .update({
              'upvotes': db.raw('upvotes - 1'),
              'downvotes': db.raw('downvotes + 1')
            })
            .returning('*')
            .then(data => {
              res.json(data[0]);
            })
        } else if (currentVote === false && newVote === true) {
          return trx(dbName).where(idLabel, '=', assetId)
            .update({
              'upvotes': db.raw('upvotes + 1'),
              'downvotes': db.raw('downvotes - 1')
            })
            .returning('*')
            .then(data => {
              res.json(data[0]);
            })
        } else if (currentVote === true && newVote === null) {
          return trx(dbName).where(idLabel, '=', assetId)
            .update({
              'upvotes': db.raw('upvotes - 1')
            })
            .returning('*')
            .then(data => {
              res.json(data[0]);
            })
        } else if (currentVote === false && newVote === null) {
          return trx(dbName).where(idLabel, '=', assetId)
            .update({
              'downvotes': db.raw('downvotes - 1')
            })
            .returning('*')
            .then(data => {
              res.json(data[0]);
            })
        } else if (currentVote === null && newVote === true) {
          return trx(dbName).where(idLabel, '=', assetId)
            .update({
              'upvotes': db.raw('upvotes + 1')
            })
            .returning('*')
            .then(data => {
              res.json(data[0]);
            })
        } else if (currentVote === null && newVote === false) {
          return trx(dbName).where(idLabel, '=', assetId)
            .update({
              'downvotes': db.raw('downvotes + 1')
            })
            .returning('*')
            .then(data => {
              res.json(data[0]);
            })
        } else {
          res.status(400).json('Cannot vote twice')
        }
      })
      .then(trx.commit)
      .then(trx.rollback)
  })
}

const makeNewVote = (db, userId, assetId, assetType, newVote, res) => {
  let votesTable, dbName, idLabel;
  if (assetType === POST) {
    votesTable = 'post_votes';
    dbName = 'posts';
    idLabel = 'post_id';
  } else if (assetType === COMMENT) {
    votesTable = 'comment_votes';
    dbName = 'comments';
    idLabel = 'comment_id';
  }

  db.transaction(trx => {
    if (newVote === true) {
      trx.insert({
        user_id: userId,
        [idLabel]: assetId,
        user_vote: newVote,
        time_voted: new Date()
      })
      .into(votesTable)
      .then(() => {
        return trx(dbName)
          .where({
            [idLabel]: assetId
          })
          .update({
            'upvotes': db.raw('upvotes + 1')
          })
          .returning('*')
          .then(data => {
            res.json(data[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    } else if (newVote === false) {
      trx.insert({
        user_id: userId,
        [idLabel]: assetId,
        user_vote: newVote,
        time_voted: new Date()
      })
      .into(votesTable)
      .then(() => {
        return trx(dbName)
          .where({
            [idLabel]: assetId
          })
          .update({
            'downvotes': db.raw('downvotes + 1')
          })
          .returning('*')
          .then(data => {
            res.json(data[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    } else {
      res.status(400).json('No previous vote recorded');
    }
  })
}

const vote = db => (req, res) => {
  const { userId } = req.body;
  const { postId, commentId } = req.params;
  const assetId = postId || commentId;
  const { dir } = req.query;

  let assetType;
  if (postId) {
    assetType = POST;
  } else if (commentId) {
    assetType = COMMENT;
  }

  let newVote;
  if (dir === '1') {
    newVote = true;
  } else if (dir === '-1') {
    newVote = false;
  } else if (dir === '0') {
    newVote = null;
  } else {
    res.status(400).json('Only 1, -1, and 0 are valid direction values');
  }

  // check if they have already voted
  hasAlreadyVoted(db, userId, assetId, assetType).then(currentVote => {
    if (currentVote === undefined) {
      makeNewVote(db, userId, assetId, assetType, newVote, res);
    } else {
      updateVote(db, userId, assetId, assetType, currentVote, newVote, res);
    }
  })

}

module.exports = {
  vote: vote
}
