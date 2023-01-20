import React, { useContext } from "react";

const voidFunction = () => {};

const AuthContextValues = {
  isAuthenticated: false,
  isLoading: false,
  user: undefined,
  error: undefined,
  token: undefined,
  login: voidFunction,
  logout: voidFunction,
};

export const AuthContext = React.createContext(AuthContextValues);

export const useAuthContext = () => useContext(AuthContext);
