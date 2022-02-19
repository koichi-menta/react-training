import React from "react";
import "./App.css";

const User = ({ name, hoby }) => {
  return (
    <>
      <p>名前：{name}</p>
      <p>趣味：{hoby}</p>
      <br />
    </>
  );
};

const App = () => {
  return (
    <div className="wrapper">
      <User name="koichi" hoby="YouTube" />
    </div>
  );
};

export default App;
