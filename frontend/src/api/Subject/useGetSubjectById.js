import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Subjects";
const params = {};

const useGetSubject = (id, dependencies = []) =>
  useApi(method, endpoint + "/" + id, params, dependencies);

export default useGetSubject;
