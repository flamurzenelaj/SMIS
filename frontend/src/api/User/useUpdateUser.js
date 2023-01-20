import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.PUT;
const endpoint = "Region";
const params = {};

const useDeleteUser = (id, body, init = false, dependencies = []) =>
  useApi(method, endpoint + "/" + id, body, params, dependencies, init);

export default useDeleteUser;
