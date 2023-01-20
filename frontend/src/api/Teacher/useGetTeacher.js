import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Teachers";
const params = {};

const useGetTeacher = (dependencies = []) =>
  useApi(method, endpoint, {}, params, dependencies, true);

export default useGetTeacher;
