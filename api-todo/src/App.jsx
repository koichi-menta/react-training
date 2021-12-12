import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setTodo } from "./todoSlice";

const TodoListItem = ({ index, item }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(item.name);
  const handleEdit = () => setIsEdit(true);
  const todo = useSelector((state) => state.todo.value);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    const obj = {
      name: name,
    };
    axios
      .put(`${process.env.REACT_APP_ENDPOINT}/user/${item.id}`, obj)
      .then((res) => {
        const newTodo = new Array(...todo);
        newTodo.splice(index, 1, res.data);
        dispatch(setTodo([...newTodo]));
      });
    setIsEdit(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_ENDPOINT}/user/${item.id}`)
      .then((res) => {
        console.log("res", res);
        const newTodo = new Array(...todo);
        newTodo.splice(index, 1);
        dispatch(setTodo([...newTodo]));
      });
  };

  useEffect(() => {
    setName(item.name);
  }, [item.name]);

  return (
    <li>
      {isEdit ? (
        <>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button onClick={handleUpdate}>更新</button>
        </>
      ) : (
        <>
          {item.name}
          <button onClick={handleEdit}>編集</button>
        </>
      )}
      <button onClick={handleDelete}>削除</button>
    </li>
  );
};

const App = () => {
  const todo = useSelector((state) => state.todo.value);
  const [taskName, setTaskName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setTaskName(value);
  };

  const handleAddTodo = () => {
    const obj = {
      name: taskName,
    };
    axios.post(`${process.env.REACT_APP_ENDPOINT}/user`, obj).then((res) => {
      console.log("post res", res);
      dispatch(setTodo([...todo, res.data]));
      setTaskName("");
    });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_ENDPOINT}/user`).then((res) => {
      console.log("res", res.data);
      dispatch(setTodo(res.data));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        value={taskName}
      />
      <button onClick={handleAddTodo}>登録</button>
      <ul>
        {todo?.map((item, index) => {
          return <TodoListItem index={index} item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
};

export default App;
