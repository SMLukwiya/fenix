
// Fetch API to read an employee
const read = (params, credentials) => {
  return fetch('/api/users/'+params.employeeId, {
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
  return fetch('/api/users/'+params.userId, {
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


export { read, update };
