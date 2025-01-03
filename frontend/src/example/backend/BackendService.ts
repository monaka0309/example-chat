import { RestClient, Logger } from 'framework';

const restClient = new RestClient();

const getHelloWorld = async () => {
  Logger.debug('call service of getHelloWorld');

  const response = await restClient.get('/api/helloWorld');
  Logger.debug(response);
  return response.json();
};

const getTodos = async () => {
  Logger.debug('call service of getTodos');

  const response = await restClient.get('/api/todos');
  Logger.debug(response);
  return response.json();
};

const BackendService = {
  getHelloWorld,
  getTodos,
};
export default BackendService;
