import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "useGetAllStudentData";
const params = {};

const useGetAllStudentData = (dependencies = []) =>
  useApi(method, endpoint, params, dependencies);

export default useGetAllStudentData;
