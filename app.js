const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./src/schema');
const { resolvers } = require('./src/resolvers');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
