const resolvers = {
  Query: {
    todoList: (_, __, { dataSources }) => {
      return dataSources.todoAPI.getTodoList();
    },
  },

  Mutation: {
    addTodo: async (_, { name }, { dataSources }) => {
      // console.log("data aaa", data);
      console.log("data name", name);
      try {
        const todo = await dataSources.todoAPI.addTodo(name);
        console.log("todo", todo);
        return {
          code: 200,
          success: true,
          todo,
        };
      } catch (err) {
        console.log("err.extensions.response", err.extensions);
        return {
          code: 111,
          success: false,
          message: err,
          todo: null,
        };
      }
    },
    editTodo: async (_, { todo }, { dataSources }) => {
      console.log("todo", todo);
      // console.log("__", __);
      try {
        const newTodo = await dataSources.todoAPI.editTodo(todo);
        console.log("todo", todo);
        return {
          code: 200,
          success: true,
          todo: newTodo,
        };
      } catch (err) {
        console.log("err.extensions.response", err);
        return {
          code: 111,
          success: false,
          message: err,
          todo: null,
        };
      }
    },
  },
};
export default resolvers;
