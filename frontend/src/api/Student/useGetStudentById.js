import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Students";
const params = {};

const useGetStudent = (id, dependencies = []) =>
  useApi(method, endpoint + "/" + id, params, dependencies);

export default useGetStudent;
