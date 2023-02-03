import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "useGetAllExamData";
const params = {};

const useGetAllExamData = (dependencies = []) =>
  useApi(method, endpoint, params, dependencies);

export default useGetAllExamData;
