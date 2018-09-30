
export const getCommentsAsList = (state) => {
  const commentsById = state.commentsReducer.commentsById;
  const commentList = Object.entries(commentsById).map(entry => entry[1]);
  return commentList;
}
