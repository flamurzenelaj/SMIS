import jwt_decode from "jwt-decode";

export const checkTokenExpiration = (token) => {
  if (jwt_decode(token).exp < Date.now() / 1000) {
    return true;
  }

  return false;
};
