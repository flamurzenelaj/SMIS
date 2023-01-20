import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.POST;
const endpoint = "Auth/login";
const params = {};

const useLogin = (body, init = false, dependencies = []) =>
  useApi(method, endpoint, body, params, dependencies, init);

export default useLogin;
