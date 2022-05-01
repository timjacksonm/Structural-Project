const axios = require('axios');
const { gql } = require('apollo-server');
const { XMLHttpRequest } = require('xmlhttprequest');

global.XMLHttpRequest = XMLHttpRequest;

describe('Company API Queries', () => {
  test('Query a list of all employees by firstName', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query Query {
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

  test('Query the ceo by job title returning fist and last name', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: `
      query Query {
        employees {
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
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
  });

  test('Query an employee by id that is not found', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
  });

  test('Query a list of all departments by name', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
  });

  test('Query a list of employees that are below a user in the hierarchy', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
  });

  test('Query a list of all employees wtesthin a department', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
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
