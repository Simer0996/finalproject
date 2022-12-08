const { gql } = require('apollo-server');

module.exports = gql`
  type Blog {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    title: String
  }

  type User {
    id:ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  input RegisterInput {
   username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

 type Query {
    getBlogs: [Blog]
    getBlog(blogId: ID!): Blog
  }
  
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username:String!, password:String!): User!
    createBlog(body: String!): Blog!
    deleteBlog(blogId: ID!): String!
  }
`;
