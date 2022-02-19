import { RESTDataSource } from "apollo-datasource-rest";

class TodoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3002/";
  }

  getTodoList() {
    return this.get("todo");
  }

  addTodo(name) {
    return this.post("todo", { name });
  }

  editTodo(todo) {
    return this.put(`todo/${todo.id}`, { name: todo.name });
  }
}

export default TodoAPI;
