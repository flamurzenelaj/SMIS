import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "User";
const params = {};

const useGetUserById = (id, dependencies = []) =>
  useApi(method, endpoint + "/" + id, {}, params, dependencies, true);

export default useGetUserById;
