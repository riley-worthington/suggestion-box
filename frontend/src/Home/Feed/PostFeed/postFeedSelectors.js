
export const getUserById = (state, userId) => {
  console.log(state.feed.teamMembersById)
  return state.feed.teamMembersById[userId];
}
