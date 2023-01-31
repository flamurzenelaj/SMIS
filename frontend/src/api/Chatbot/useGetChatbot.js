import useApi, { METHOD } from "../../lib/hooks/useApi";

const method = METHOD.GET;
const endpoint = "Chatbot";
const params = {};

const useGetChatbot = (dependencies = []) =>
  useApi(method, endpoint, {}, params, dependencies, true);

export default useGetChatbot;
