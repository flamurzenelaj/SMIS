import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "User";
const params = {};

const useGetUser = (dependencies = []) =>
  useApi(method, endpoint, {}, params, dependencies, true);

export default useGetUser;
