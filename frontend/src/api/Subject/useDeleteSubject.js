import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.DELETE;
const endpoint = "Subjects";
const params = {};

const useDeleteSubject = (id, init = false, dependencies = []) =>
  useApi(method, endpoint + "/" + id, {}, params, dependencies, init);

export default useDeleteSubject;
