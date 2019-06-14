// Fetch API to create am employee
const create = (employee) => {
  return fetch('/api/admin/employees', {
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

//LIst all employees
const list = () => {
  return fetch('/api/admin/:adminId', {
    method: 'GET',
  }).then(response => {
    return response.json()
  }).catch((err) => console.log(err))
}

// Fetch API to read an employee
const read = (params, credentials) => {
  return fetch('/api/employee/'+params.employeeId, {
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
  return fetch('/api/employee/'+params.userId, {
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

// Fetch API to delete an employee
const remove = (params, credentials) => {
  return fetch('/api/admin/'+params.employeeId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+credentials.t
    }
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}


export { create, list, read, update, remove };
