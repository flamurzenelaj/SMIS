import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "useGetAllChatbotData";
const params = {};

const useGetAllChatbotData = (dependencies = []) =>
  useApi(method, endpoint, params, dependencies);

export default useGetAllChatbotData;
