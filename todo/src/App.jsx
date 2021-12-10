import React, { useState } from "react";

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
        {todo.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default App;
