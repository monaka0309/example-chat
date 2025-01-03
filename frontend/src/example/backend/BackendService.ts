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

const postTodo = async (text: string) => {
  Logger.debug('call service of postTodo');

  const response = await restClient.post('/api/todos', {text});
  Logger.debug(response);
  if(response.ok){
    return;
  }
  throw new Error('Web API call failed. [ status code: ${response.status} ]');
};

const BackendService = {
  getHelloWorld,
  getTodos,
  postTodo,
};


export default BackendService;
