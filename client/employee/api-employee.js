//Only accessible by Admin
const create = (employee) => {
  return fetch('/api/employee/', {
    method: 'POST',
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
  .then((response) => {
    return response.json();
  })
  .catch((err) => console.log(err));
}

// Fetch API to read an employee
const read = (params, credentials) => {
  return fetch('/api/employees/'+params.employeeId, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+credentials.t
    }
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

// Fetch API to update an employee including employee points
const update = (params, credentials, employee) => {
  return fetch('/api/employees/'+params.userId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ credentials.t
    },
    body: JSON.stringify(employee)
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}


export { create, read, update };
