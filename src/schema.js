const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    hello: String!
  }
`;
