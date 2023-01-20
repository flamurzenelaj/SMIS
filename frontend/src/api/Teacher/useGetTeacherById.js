import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Teachers";
const params = {};

const useGetTeacher = (id, dependencies = []) =>
  useApi(method, endpoint + "/" + id, params, dependencies);

export default useGetTeacher;
