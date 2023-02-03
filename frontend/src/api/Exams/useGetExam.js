import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Exams";
const params = {};

const useGetExam = (dependencies = []) =>
  useApi(method, endpoint, {}, params, dependencies, true);

export default useGetExam;
