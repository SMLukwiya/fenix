//Fetch API for sign in
const signin = (employee) => {
  return fetch('/auth/signin/', {
    method: 'POST',
    headers: {
      'Accept':'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(employee)
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

//Fetch API for signout
const signout = () => {
  return fetch('/auth/signout/', {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).catch((err) => console.log(err));
}

export { signin, signout };
