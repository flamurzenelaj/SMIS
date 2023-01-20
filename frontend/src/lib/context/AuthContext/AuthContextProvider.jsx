import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { checkTokenExpiration } from "../../helpers/checkTokenExpiration";
import localforage from "localforage";
import jwtDecode from "jwt-decode";

export const LOCAL_STORAGE_KEY = "MCCR";

export const AuthContextProvider = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [token, setToken] = useState();
  const navigation = useNavigate();

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const localToken = await localforage.getItem(LOCAL_STORAGE_KEY);

    if (!localToken || checkTokenExpiration(localToken)) {
      setLoading(false);
      setUser(undefined);
      return;
    }
    setToken(localToken);

    try {
      const user = jwtDecode(localToken);
      setUser(parseJwtClaims(user));
    } catch (err) {
      setError(err);
      localforage.removeItem(LOCAL_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  };

  const parseJwtClaims = (claims) => {
    const obj = {};

    Object.keys(claims).forEach(function (key) {
      let res = key.split("/");
      if (res.length > 1) {
        if (res[res.length - 1] === "role") {
          obj["role"] = claims[key];
        } else if (res[res.length - 1] === "name") {
          obj["name"] = claims[key];
        }
        obj[key] = claims[key];
      }
    });
    return obj;
  };

  const login = (token) => {
    const name = jwtDecode(token);
    const user = parseJwtClaims(name);
    setUser(user);
    setToken(token);
    localforage.setItem(LOCAL_STORAGE_KEY, token);
    navigation("/");
  };

  const logout = async () => {
    setUser(undefined);
    setToken(undefined);
    await localforage.removeItem(LOCAL_STORAGE_KEY);
    await authenticate();
    navigation("/login");
  };

  const context = {
    isAuthenticated: user !== undefined,
    isLoading: loading,
    error: error,
    user: user,
    token: token,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};
