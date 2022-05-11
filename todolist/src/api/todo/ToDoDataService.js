import axios from 'axios';

class ToDoDataService {
  retrieveAllTodos(username) {
    return axios.get(`http://localhost:8080/users/${username}/todos`);
  }

  retrieveTodo(username, id) {
    return axios.get(`http://localhost:8080/users/${username}/todos/${id}`);
  }

  deleteTodo(username, id) {
    return axios.delete(`http://localhost:8080/users/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo) {
    return axios.put(
      `http://localhost:8080/users/${username}/todos/${id}`,
      todo
    );
  }

  createTodo(username, todo) {
    return axios.post(`http://localhost:8080/users/${username}/todos`, todo);
  }
}

export default new ToDoDataService();
