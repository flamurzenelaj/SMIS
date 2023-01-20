import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "useGetAllTeacherData";
const params = {};

const useGetAllTeacherData = (dependencies = []) =>
  useApi(method, endpoint, params, dependencies);

export default useGetAllTeacherData;
