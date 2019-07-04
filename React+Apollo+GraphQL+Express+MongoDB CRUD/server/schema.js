import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    age: Int!
    gender: String!
  }

  type Query {
    getUser(_id: ID!): User
    allUser: [User]
  }

  input UserInput {
    name: String!
    age: Int!
    gender: String!
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(_id: ID!, input: UserInput): User
    deleteUser(_id: ID!): User
  }
`;
