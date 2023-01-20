import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.DELETE;
const endpoint = "User";
const params = {};

const useDeleteUser = (id, init = false, dependencies = []) =>
  useApi(method, endpoint + "/" + id, {}, params, dependencies, init);

export default useDeleteUser;
