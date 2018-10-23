import { createSelector } from 'reselect';
import { getPostById } from '../Post/postSelectors';
import { postFeedFilters as filters } from './postFeedConstants';

export const getUserById = (state, userId) => state.feed.teamMembersById[userId];

export const selectPostFeedFilter = state => state.feed.filter;
export const selectPosts = state => state.feed.postList.map(id => getPostById(state, id));

export const selectSortedPosts = createSelector(
  selectPostFeedFilter, selectPosts,
  (filter, posts) => {
    if (filter === filters.MOST_RECENT) {
      return posts.sort((a, b) => new Date(b.time_posted) - new Date(a.time_posted));
    } else if (filter === filters.TOP_VOTED) {
      return posts.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    }
  }
);
