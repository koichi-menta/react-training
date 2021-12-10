import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>プラス</button>
      <button onClick={() => setCount(count - 1)}>マイナス</button>
      <button onClick={() => setCount(0)}>リセット</button>
    </div>
  );
};

export default App;
