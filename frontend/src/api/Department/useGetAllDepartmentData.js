import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "useGetAllDepartmentData";
const params = {};

const useGetAllDepartmentData = (dependencies = []) =>
  useApi(method, endpoint, params, dependencies);

export default useGetAllDepartmentData;
