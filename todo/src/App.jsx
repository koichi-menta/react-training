import React, { useEffect, useState } from "react";

const TodoListItem = ({ index, item, todo, setTodo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(item);

  const handleEdit = () => setIsEdit(true);

  const handleUpdate = () => {
    todo[index] = name;
    setTodo([...todo]);
    setIsEdit(false);
  };

  const handleDelete = () => {
    todo.splice(index, 1);
    setTodo([...todo]);
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
  const [todo, setTodo] = useState([]);
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
        {todo.map((item, index) => {
          return (
            <TodoListItem
              index={index}
              item={item}
              // TODO: todoを書き換える為に全部渡しているが無駄なのでリファクタできる
              todo={todo}
              setTodo={setTodo}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default App;
