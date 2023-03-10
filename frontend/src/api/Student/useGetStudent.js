import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Students";
const params = {};

const useGetStudent = (dependencies = []) =>
  useApi(method, endpoint, {}, params, dependencies, true);

export default useGetStudent;
