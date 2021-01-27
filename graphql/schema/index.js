const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Post {
  _id: ID!
  creator: User!
  picture: String!
  public_id: String!
  caption: String
  createdAt: String!
  updatedAt: String!
  comments: [Comment!]
  likes: [User!]
}

type User {
  _id: ID!
  email: String!
  nickname: String!
  password: String
  bio: String
  avatar: Avatar
  createdPosts: [Post!]
}

type Avatar {
  _id: ID!
  picture: String
  public_id: String
  createdAt: String!
  updatedAt: String!
}

type Comment {
  _id: ID!
  text: String!
  creator: User!
  createdAt: String!
  updatedAt: String!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
  nickname: String!
}

type ProfileData {
  bio: String
  nickname: String
}


input PostInput {
  picture: String!
  public_id: String!
  caption: String!
}


input UpdateUser {
  bio: String
  nickname: String
}

input SignUp {
  nickname: String!
  email: String!
  password: String!
}

input CommentInput {
  postId: String!
  text: String!
}

input LikeInput {
  postId: String!
  userId: String!
}

type RootQuery {
  user(userId: String!): User!
  userPosts: [Post!]
  comments: [Comment!]
  users: [User!]
  posts: [Post!]
  login(email: String!, password: String!): AuthData!
  userByName(nickname: String!): User
  profile: User
  post(postId: String!): Post!
  likes(postId: String!): Post
}

type RootMutation {

  createUser(userInput: SignUp): User
  deleteComment(commentId: String!): Comment 
  updateAvatar(picture: String!, public_id: String!): Avatar 
  createComment(commentInput: CommentInput): Comment
  createPost(postInput: PostInput): Post
  deletePost(postId: String!): Post
  likePost(likeInput: LikeInput): Post
  updateBio(profileData: UpdateUser): ProfileData
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
