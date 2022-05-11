import axios from 'axios';

class ToDoDataService {
  retrieveAllTodos(name) {
    return axios.get(`http://localhost:8080/users/${name}/todos`);
  }

  deleteTodo(username, id) {
    return axios.delete(`http://localhost:8080/users/${username}/todos/${id}`);
  }
}

export default new ToDoDataService();
