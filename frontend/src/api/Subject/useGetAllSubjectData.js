import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "useGetAllSubjectData";
const params = {};

const useGetAllSubjectData = (dependencies = []) =>
  useApi(method, endpoint, params, dependencies);

export default useGetAllSubjectData;
