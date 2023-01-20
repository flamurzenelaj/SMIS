import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Departments";
const params = {};

const useGetDepartmentById = (id, dependencies = []) =>
  useApi(method, endpoint + "/" + id, params, dependencies);

export default useGetDepartmentById;
