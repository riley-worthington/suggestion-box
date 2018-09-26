export const users = [
  {
    firstName: 'Ryan',
    lastName: 'Gregson',
    email: 'grego@gmail.com',
    posts: [0],
    comments: [],
    teams: [1],
    userId: 0,
  },
  {
    firstName: 'Harry',
    lastName: 'Potter',
    email: 'harry@hogwarts.com',
    posts: [1],
    comments: [],
    teams: [0],
    userId: 1,
  },
  {
    firstName: 'Hermione',
    lastName: 'Granger',
    email: 'hermione@hogwarts.com',
    posts: [2],
    comments: [0],
    teams: [0],
    userId: 2,
  }
]

export const teams = {
  '0': {
    name: "Dumbledore's Army",
    teamId: 0,
    members: [1, 2],
    posts: [1, 2]
  },
  '1': {
    name: 'Melbourne Track Club',
    teamId: 1,
    members: [0],
    posts: [0]
  }
}

export const posts = [
  {
    originalPoster: 0,
    upvotes: 10,
    downvotes: 1,
    comments: [0],
    postId: 0,
    title: 'Hey guys',
    content: "Where is everybody?"
  },
  {
    originalPoster: 1,
    upvotes: 7,
    downvotes: 3,
    comments: [],
    postId: 1,
    title: 'Come play quiddich',
    content: 'We got the pitch reserved, come out'
  },
  {
    originalPoster: 2,
    upvotes: 10,
    downvotes: 0,
    comments: [],
    postId: 2,
    title: "Join Dumbledore's Army",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
]

export const comments = [
  {
    commenter: 2,
    post: 1,
    commentId: 0,
    upvotes: 5,
    downvotes: 2,
    content: "This is serious business Harry. You're being distracting."
  }
]
