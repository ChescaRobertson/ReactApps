import axios from 'axios';

class HelloWorldService {
  //   executeHelloWorldBeanService() {
  //     return axios.get('http://localhost:8080/hello-world-bean');
  //   }

  executeHelloWorldPathVariableService(name) {
    return axios.get(`http://localhost:8080/hello-world/path-variable/${name}`);
  }
}

export default new HelloWorldService();
