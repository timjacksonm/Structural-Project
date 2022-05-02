const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    employees(jobTitle: String): [Employee!]!
    employee(id: ID!): Employee
    departments: [Department!]!
    department(id: ID, name: String): Department
  }

  type Employee {
    id: ID!
    firstName: String
    lastName: String
    jobTitle: String
    departmentId: String
    department: Department!
  }

  type Department {
    id: ID!
    name: String!
    employees: [Employee!]!
  }
`;
