import React, { useEffect, useState } from "react";
import "./App.css";
import { useQuery, useMutation, useReactiveVar, gql } from "@apollo/client";
import { taskListVar } from "./apolloVars";

const GET_TODO = gql`
  query getTodoList {
    todoList {
      id
      name
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($name: String!) {
    addTodo(name: $name) {
      todo {
        id
        name
      }
    }
  }
`;

const EDIT_TODO = gql`
  mutation addTodo($name: String) {
    addTodo(todo: $todo) {
      name
    }
  }
`;

const App = () => {
  const list = useReactiveVar(taskListVar);
  const { data } = useQuery(GET_TODO);
  const [addTodo] = useMutation(ADD_TODO, {
    variables: { name: "hogehoge" },
    onCompleted: (data) => {
      console.log(data);
    },
  });
  console.log("data", data);

  useEffect(() => {
    taskListVar(["hoge"]);
  }, []);

  const handleCLick = () => {
    console.log(taskListVar());
  };

  const addTask = () => {
    taskListVar(["piyo"]);
  };

  const handleAdd = () => {};

  return (
    <div className="App">
      <button onClick={handleCLick}>表示</button>
      <button onClick={addTask}>追加</button>
      <button onClick={addTodo}>登録</button>
      <p>{list}</p>
    </div>
  );
};

export default App;
