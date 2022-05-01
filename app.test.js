const axios = require('axios');
const { gql } = require('apollo-server');
const { XMLHttpRequest } = require('xmlhttprequest');

global.XMLHttpRequest = XMLHttpRequest;

describe('Company API Queries', () => {
  test('Query a list of all employees', async () => {
    const response = await axios.post('http://localhost:4000/', {
      query: ``,
    });

    const { data } = response;
    expect(data).toMatchObject();
  });

  test('Query the ceo by job ttestle returning fist and last name', async () => {});

  test('Query an employee by id', async () => {});

  test('Query an employee by id that is not found', async () => {});

  test('Query a list of all departments by name', async () => {});

  test('Query a list of employees that are below a user in the hierarchy', async () => {});

  test('Query a list of all employees wtesthin a department', async () => {});
});

describe('Company API Mutations', () => {
  test('Update an employees first name to Bob', async () => {});

  test('Update an employees first name to a Number', async () => {});

  test('Update an employees department he works in', async () => {});

  test('Update an employees job ttestle', async () => {});

  test('Delete an employees record', async () => {});
});
