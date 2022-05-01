const UserData = require('../UserData.json');

exports.resolvers = {
  Query: {
    employees: (parent, args, context) => {
      if (args?.jobTitle) {
        return UserData.people.filter(
          (person) => person.jobTitle === args.jobTitle
        );
      } else {
        return UserData.people;
      }
    },
    employee: (parent, args, context) => {
      if (args?.id) {
        const employee = UserData.people.find(
          (person) => person.id === args.id
        );
        if (!employee) return null;
        return employee;
      }
    },
  },
};
