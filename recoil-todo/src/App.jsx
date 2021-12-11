import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";

const todoState = atom({
  key: "todoState",
  default: [],
});

const TodoListItem = ({ index, item }) => {
  const [todo, setTodo] = useRecoilState(todoState);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(item);
  const handleEdit = () => setIsEdit(true);

  const handleUpdate = () => {
    const newTodo = new Array(...todo);
    newTodo.splice(index, 1, name);
    setTodo(newTodo);
    setIsEdit(false);
  };

  const handleDelete = () => {
    const newTodo = new Array(...todo);
    newTodo.splice(index, 1);
    setTodo(newTodo);
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
  const [todo, setTodo] = useRecoilState(todoState);
  const [taskName, setTaskName] = useState("");

  const handleChange = (value) => {
    setTaskName(value);
  };

  const handleAddTodo = () => {
    setTodo([...todo, taskName]);
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
        {todo?.map((item, index) => {
          return <TodoListItem index={index} item={item} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default App;
