const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const UserData = require('./UserData.json');

const app = express();

const PeopleType = new GraphQLObjectType({
  name: 'People',
  description: 'This is a person apart of the organization',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    jobTitle: { type: GraphQLNonNull(GraphQLString) },
    departmentId: { type: GraphQLNonNull(GraphQLString) },
    managerId: { type: GraphQLString },
  }),
});

const DepartmentType = new GraphQLObjectType({
  name: 'Department',
  description: 'This is a department of the organization.',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve: (department) => {
        return UserData.people.filter(
          (employee) => employee.departmentId === department.id
        );
      },
    },
  }),
});

const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  description: 'This represents a list of employees',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    jobTitle: { type: GraphQLNonNull(GraphQLString) },
    departmentId: { type: GraphQLNonNull(GraphQLString) },
    managerId: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Organization',
  description: 'Root Organization',
  fields: () => ({
    ceo: {
      type: PeopleType,
      description: 'This is the CEO of the organization.',
      resolve: () => UserData.people.find((user) => user.jobTitle === 'CEO'),
    },
    departments: {
      type: new GraphQLList(DepartmentType),
      description: 'List of all departments within the organization.',
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        if (args?.id) {
          return [
            UserData.departments.find(
              (department) => department.id === args.id
            ),
          ];
        }
        if (args?.name) {
          return [
            UserData.departments.find(
              (department) => department.name === args.name
            ),
          ];
        }
        return UserData.departments;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log('Server running on port 5000'));
