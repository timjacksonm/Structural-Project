const UserData = require('../UserData.json');

exports.resolvers = {
  Query: {
    employees: (args) => {
      if (args?.jobTitle) {
        return UserData.people.filter((person) => person.jobTitle === jobTitle);
      } else {
        return UserData.people;
      }
    },
  },
};
