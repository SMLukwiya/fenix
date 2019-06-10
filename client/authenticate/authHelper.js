const auth = {
//Retrieve credentials if employee signed-in.
  isAuthenticated() {
    if (typeof window == "undefined") {
      return false;
    }

    if (sessionStorage.getItem('jwt')) {
      return JSON.parse(sessionStorage.getItem('jwt'));
    }
    else {
      return false;
    }
  },
//Save credentials on successful sign-in.
  authenticate(jwt, cb) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    }
    cb();
  },
//Delete credentials and sign out
  signout(cb) {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem('jwt')
    }
    cb();
  }
}

export default auth;
