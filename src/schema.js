const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    employees(jobTitle: String): [Employee!]!
    employee(id: ID!): Employee
  }

  type Employee {
    id: String!
    firstName: String
    lastName: String
    jobTitle: String
    departmentId: String
  }
`;
