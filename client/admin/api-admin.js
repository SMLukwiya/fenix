// Fetch API to read an admin
const read = (params, credentials) => {
  return fetch('/api/admin/'+params.adminId, {
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

export { read };
