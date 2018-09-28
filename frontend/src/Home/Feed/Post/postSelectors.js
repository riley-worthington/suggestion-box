import { createSelector } from 'reselect';

const getPosts = state => state.postsById;
const getPostList = state => state.postList;

export const getPostById = (state, postId) => {
  return state.postsById.postsById[postId];
}
