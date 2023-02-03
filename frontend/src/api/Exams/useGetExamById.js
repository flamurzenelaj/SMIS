import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Exams";
const params = {};

const useGetExamById = (id, dependencies = []) =>
  useApi(method, endpoint + "/" + id, params, dependencies);

export default useGetExamById;
