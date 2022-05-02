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
    departments: (parent, args, context) => {
      return UserData.departments;
    },
    department: (parent, args, context) => {
      if (args?.id) {
        return UserData.departments.find(
          (department) => department.id === args.id
        );
      }
      if (args?.name) {
        return UserData.departments.find(
          (department) => department.name === args.name
        );
      }
    },
  },
  Employee: {
    department: (parent, args, context) => {
      return UserData.departments.find(
        (department) => department.id === parent.departmentId
      );
    },
  },
  Department: {
    employees: (parent, args, context) => {
      const department = parent.id;
      return UserData.people.filter(
        (person) => person.departmentId === department
      );
    },
  },
};
