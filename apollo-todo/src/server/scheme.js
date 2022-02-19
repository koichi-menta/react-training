import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    todoList: [Todo]!
  }
  type Mutation {
    addTodo(name: String!): TodoResponse
    editTodo(todo: TodoInput): TodoResponse
  }

  type Todo {
    id: ID!
    name: String
  }
  input TodoInput {
    id: ID!
    name: String
  }

  type TodoResponse {
    code: Int!
    success: Boolean!
    message: String
    todo: Todo
  }
`;
