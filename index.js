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
  description: 'Employees of the organization',
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
      resolve: () => UserData.people.find((user) => user.jobTitle === 'CEO'),
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
