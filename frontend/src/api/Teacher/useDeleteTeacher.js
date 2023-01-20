import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.DELETE;
const endpoint = "Teachers";
const params = {};

const useDeleteTeacher = (id, init = false, dependencies = []) =>
  useApi(method, endpoint + "/" + id, {}, params, dependencies, init);

export default useDeleteTeacher;
