import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Subjects";
const params = {};

const useGetSubject = (dependencies = []) =>
  useApi(method, endpoint, {}, params, dependencies, true);

export default useGetSubject;
