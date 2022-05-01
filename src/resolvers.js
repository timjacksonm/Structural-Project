const UserData = require('../UserData.json');

exports.resolvers = {
  Query: {
    employees: () => UserData.people,
  },
};
