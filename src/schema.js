const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    employees: [Employee!]!
  }

  type Employee {
    id: String!
    firstName: String
    lastName: String
    jobTitle: String
    departmentId: String
  }
`;
