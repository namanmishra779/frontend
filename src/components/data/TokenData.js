import jwtDecode from "jwt-decode";

var token = "";

if (!token) {
  const storedToken = JSON.parse(localStorage.getItem("key"));
  if (storedToken && storedToken.token) {
    token = storedToken.token;
  }
}

export function isToken() {
  if (token) return true;
  return false;
}

export function getName() {
  if (token) {
    return jwtDecode(token).sub;
  }
  return false;
}

export function getAuthority() {
  if (token) {
    return jwtDecode(token).authorities[0];
  }
  return false;
}

export function getEmail() {
  if (token) {
    return jwtDecode(token).email;
  }
  return false;
}
