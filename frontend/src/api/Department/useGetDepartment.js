import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Departments";
const params = {};

const useGetDepartment = (dependencies = []) =>
  useApi(method, endpoint, {}, params, dependencies, true);

export default useGetDepartment;
