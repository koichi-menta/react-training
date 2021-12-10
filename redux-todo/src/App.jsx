import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTodo } from "./todoSlice";

const TodoListItem = ({ index, item }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(item);
  const todo = useSelector((state) => state.todo.value);
  const dispatch = useDispatch();

  const handleEdit = () => setIsEdit(true);

  const handleUpdate = () => {
    // todoは読み取り専用のため
    const newTodo = new Array(todo);
    newTodo.splice(index, 1, name);
    dispatch(setTodo([...newTodo]));
    setIsEdit(false);
  };

  const handleDelete = () => {
    const newTodo = new Array(todo);
    newTodo.splice(index, 1);
    dispatch(setTodo([...newTodo]));
  };

  useEffect(() => {
    setName(item);
  }, [item]);

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
          {item}
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
    dispatch(setTodo([...todo, taskName]));
    setTaskName("");
  };

  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        value={taskName}
      />
      <button onClick={handleAddTodo}>登録</button>
      <ul>
        {todo.map((item, index) => {
          return <TodoListItem index={index} item={item} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default App;
