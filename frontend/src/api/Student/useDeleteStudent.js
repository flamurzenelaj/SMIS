import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.DELETE;
const endpoint = "Students";
const params = {};

const useDeleteStudent = (id, init = false, dependencies = []) =>
  useApi(method, endpoint + "/" + id, {}, params, dependencies, init);

export default useDeleteStudent;
