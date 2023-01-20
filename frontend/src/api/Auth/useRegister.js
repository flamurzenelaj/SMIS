import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.POST;
const endpoint = "Auth/register";
const params = {};

const useRegister = (body, init = false, dependencies = []) =>
  useApi(method, endpoint, body, params, dependencies, init);

export default useRegister;
