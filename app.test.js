const axios = require('axios');
const { gql } = require('apollo-server');
const { XMLHttpRequest } = require('xmlhttprequest');

global.XMLHttpRequest = XMLHttpRequest;

describe('Company API Queries', () => {
  test('Query a list of all employees by firstName', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        employees {
          firstName
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        employees: expect.arrayContaining([
          expect.objectContaining({
            firstName: expect.any(String),
          }),
        ]),
      },
    });
  });

  test('Query the ceo by job title', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        employees(jobTitle: "CEO") {
          id
          firstName
          lastName
          jobTitle
          departmentId
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        employees: expect.arrayContaining([
          expect.objectContaining({
            id: expect.stringContaining('2798c35b-5b8f-4a5d-9858-0a818d48cbef'),
            firstName: expect.stringContaining('Orval'),
            lastName: expect.stringContaining('Hauck'),
            jobTitle: expect.stringContaining('CEO'),
            departmentId: expect.stringContaining(
              '2b9edccb-41fc-4fc5-b832-ac86a034a877'
            ),
          }),
        ]),
      },
    });
  });

  test('Query an employee by id', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        employee(id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef") {
          id
          firstName
          lastName
          jobTitle
          departmentId
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        employee: {
          id: '2798c35b-5b8f-4a5d-9858-0a818d48cbef',
          firstName: 'Orval',
          lastName: 'Hauck',
          jobTitle: 'CEO',
          departmentId: '2b9edccb-41fc-4fc5-b832-ac86a034a877',
        },
      },
    });
  });

  test('Query an employee by id and find out the department name they work in', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        employee(id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef") {
          firstName
          lastName
          department {
            name
          }
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        employee: {
          firstName: 'Orval',
          lastName: 'Hauck',
          department: {
            name: 'Management',
          },
        },
      },
    });
  });

  test('Query an employee by id and get a list of all associates first names within their department', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        employee(id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef") {
          firstName
          lastName
          department {
            employees {
              firstName
            }
          }
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        employee: {
          firstName: 'Orval',
          lastName: 'Hauck',
          department: {
            employees: expect.arrayContaining([
              expect.objectContaining({
                firstName: expect.any(String),
              }),
            ]),
          },
        },
      },
    });
  });

  test('Query a list of employees that are below a user in the hierarchy', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        employee(id: "2798c35b-5b8f-4a5d-9858-0a818d48cbef") {
          firstName
          lastName
          department {
            subordinateDepartment {
              name
              employees {
                firstName
              }
            }
          }
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        employee: {
          firstName: 'Orval',
          lastName: 'Hauck',
          department: {
            subordinateDepartment: {
              name: expect.stringContaining('Operations'),
              employees: expect.arrayContaining([
                expect.objectContaining({
                  firstName: expect.any(String),
                }),
              ]),
            },
          },
        },
      },
    });
  });

  test('Query an employee by id that is not found', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        employee(id: "not-found") {
          id
          firstName
          lastName
          jobTitle
          departmentId
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        employee: null,
      },
    });
  });

  test('Query a list of all departments by name', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        departments {
          id
          name
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        departments: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        ]),
      },
    });
  });

  test('Query a list of all employees within a department', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        department(name: "Sales") {
          id
          name
          employees {
            firstName
            jobTitle
          }
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        department: expect.objectContaining({
          id: 'cfd90465-28fa-4b9a-be3e-ef2517e987e9',
          name: 'Sales',
          employees: expect.arrayContaining([
            expect.objectContaining({
              firstName: expect.any(String),
              jobTitle: expect.any(String),
            }),
          ]),
        }),
      },
    });
  });

  test('Query each subordinate department starting from the Executive department', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        department(name: "Executive") {
          name
          subordinateDepartment {
            name
            subordinateDepartment {
              name
              subordinateDepartment {
                name
                subordinateDepartment {
                  name
                  subordinateDepartment {
                    name
                    subordinateDepartment {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        department: {
          name: 'Executive',
          subordinateDepartment: {
            name: 'Management',
            subordinateDepartment: {
              name: 'Operations',
              subordinateDepartment: {
                name: 'HR',
                subordinateDepartment: {
                  name: 'Engineering',
                  subordinateDepartment: {
                    name: 'Marketing',
                    subordinateDepartment: {
                      name: 'Sales',
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  });

  test('Query each preceding department starting from the Sales department', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query {
        department(name: "Sales") {
          name
          precededDepartment {
            name
            precededDepartment {
              name
              precededDepartment {
                name
                precededDepartment {
                  name
                  precededDepartment {
                    name
                    precededDepartment {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        department: {
          name: 'Sales',
          precededDepartment: {
            name: 'Marketing',
            precededDepartment: {
              name: 'Engineering',
              precededDepartment: {
                name: 'HR',
                precededDepartment: {
                  name: 'Operations',
                  precededDepartment: {
                    name: 'Management',
                    precededDepartment: {
                      name: 'Executive',
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  });
});

describe('Company API Mutations', () => {
  test('Update an employees first name to Bob', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
  });

  test('Update an employees first name to a Number', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
  });

  test('Update an employees department he works in', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
  });

  test('Update an employees job ttestle', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
  });

  test('Delete an employees record', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
  });
});
