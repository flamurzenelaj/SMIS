import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.DELETE;
const endpoint = "Exams";
const params = {};

const useDeleteExam = (id, body, init = false, dependencies = []) =>
  useApi(method, endpoint + "/" + id, body, params, dependencies, init);

export default useDeleteExam;
