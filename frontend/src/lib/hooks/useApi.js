import axios from "axios";
import useAsync from "./useAsync";
import { useAuthContext } from "../context/AuthContext/AuthContext";

export const METHOD = {
  POST: "post",
  GET: "get",
  PUT: "update",
  DELETE: "delete",
};

const DEFAULT_HEADERS = {
  headers: { "Content-Type": "application/json" },
};

Object.freeze(METHOD, DEFAULT_HEADERS);

axios.defaults.baseURL = "https://localhost:7255/api/";

const post = async (endpoint, body, initialize, headers) => {
  if (!initialize) return undefined;
  const res = await axios.post(`/${endpoint}`, body, {
    headers: { ...DEFAULT_HEADERS, ...headers },
  });
  console.log("POST-RES", res);
  return res.data;
};

const get = async (endpoint, params, headers) => {
  const res = await axios.get(`/${endpoint}`, {
    params: params,
    headers: { ...DEFAULT_HEADERS, ...headers },
  });
  console.log("GET-RES", res);
  return res.data;
};

const update = async (endpoint, body, initialize, headers) => {
  if (!initialize) return undefined;
  const res = await axios.put(`/${endpoint}`, body, {
    headers: { ...DEFAULT_HEADERS, ...headers },
  });
  console.log("UPDATE-RES", res);
  return res.data;
};

const remove = async (endpoint, params, initialize, headers) => {
  console.log("INIT", initialize);
  if (!(typeof initialize === "boolean")) return undefined;
  if (!initialize) return undefined;
  const res = await axios.delete(`/${endpoint}`, {
    params: params,
    headers: { ...DEFAULT_HEADERS, ...headers },
  });
  console.log("DELETE-RES", res);
  return res.data;
};

export default function useApi(
  method,
  endpoint,
  body,
  params = {},
  dependencies = [],
  initialize = false
) {
  const auth = useAuthContext();
  const bearerToken = auth.isAuthenticated ? `Bearer ${auth.token}` : null;

  return useAsync(() => {
    switch (method) {
      case METHOD.POST:
        return post(endpoint, body, initialize, {
          Authorization: bearerToken,
        });
      case METHOD.GET:
        return get(endpoint, params, { Authorization: bearerToken });
      case METHOD.PUT:
        return update(endpoint, body, initialize, {
          Authorization: bearerToken,
        });
      case METHOD.DELETE:
        return remove(endpoint, params, initialize, {
          Authorization: bearerToken,
        });
      default:
        break;
    }
  }, [...dependencies, initialize && initialize]);
}
