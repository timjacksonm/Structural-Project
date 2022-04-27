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

const DepartmentType = new GraphQLObjectType({
  name: 'Department',
  description:
    'This is a department of the organization with the option to query its employees.',
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
    departmentName: {
      type: GraphQLNonNull(GraphQLString),
      resolve: (employee) => {
        const department = UserData.departments.find(
          (department) => department.id === employee.departmentId
        );
        return department.name;
      },
    },
    subordinates: {
      type: new GraphQLList(EmployeeType),
      description: 'This list of employees report this worker',
      resolve: (employee) => {
        switch (employee.departmentId) {
          case 'aef293ee-8dcc-4d89-99cf-1b8f61bab07b' /*Executive*/:
            return UserData.people.filter(
              (user) =>
                user.departmentId === '2b9edccb-41fc-4fc5-b832-ac86a034a877' &&
                user.id != employee.id
            );
          case '2b9edccb-41fc-4fc5-b832-ac86a034a877' /*Management*/:
            return UserData.people.filter(
              (user) =>
                user.departmentId === 'ddd31c01-a30d-4e72-8e8b-d710fcc4fb56' &&
                user.id != employee.id
            );
          case 'ddd31c01-a30d-4e72-8e8b-d710fcc4fb56' /*Human Resources*/:
            return UserData.people.filter(
              (user) =>
                user.departmentId === 'e573dd1c-4cd4-451d-a844-a25210e91135' &&
                user.id != employee.id
            );
          case 'e573dd1c-4cd4-451d-a844-a25210e91135' /*Operations*/:
            return {
              engineering: UserData.people.filter(
                (user) =>
                  user.departmentId ===
                    '920a774e-617a-4a5b-82ea-8205c18eef75' &&
                  user.id != employee.id
              ),
              marketing: UserData.people.filter(
                (user) =>
                  user.departmentId ===
                    '252fc1e8-aead-45cc-9d7d-e6003897bbf9' &&
                  user.id != employee.id
              ),
              sales: UserData.people.filter(
                (user) =>
                  user.departmentId ===
                    'cfd90465-28fa-4b9a-be3e-ef2517e987e9' &&
                  user.id != employee.id
              ),
            };
          default:
            return null;
        }
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Organization',
  description: 'Root Organization',
  fields: () => ({
    ceo: {
      type: EmployeeType,
      description: 'This is the CEO of the organization.',
      resolve: () => UserData.people.find((user) => user.jobTitle === 'CEO'),
    },
    employee: {
      type: new GraphQLList(EmployeeType),
      description: 'This is an employee of the organization.',
      args: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        if (args?.id) {
          return UserData.people.filter((user) => user.id === args.id);
        }
        if (args?.firstName) {
          return UserData.people.filter(
            (user) => user.firstName === args.firstName
          );
        }
        if (args?.lastName) {
          return UserData.people.filter(
            (user) => user.lastName === args.lastName
          );
        }
        return UserData.departments;
      },
    },
    departments: {
      type: new GraphQLList(DepartmentType),
      description: 'This list all the departments within the organization.',
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

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    updateFirstName: {
      type: EmployeeType,
      description: 'Update an employees first name',
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const index = UserData.people.findIndex((user) => user.id === args.id);
        UserData.people[index].firstName = args.name;
        return UserData.people[index];
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log('Server running on port 5000'));
