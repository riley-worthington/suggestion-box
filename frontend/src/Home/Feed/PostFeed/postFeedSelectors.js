
export const getUserById = (state, userId) => {
  return state.feed.teamMembersById[userId];
}
