import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.DELETE;
const endpoint = "Departments";
const params = {};

const useDeleteDepartment = (id, body, init = false, dependencies = []) =>
  useApi(method, endpoint + "/" + id, body, params, dependencies, init);

export default useDeleteDepartment;
