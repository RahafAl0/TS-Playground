import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/?username=${username}`
      );
      const responseJason = await response.json();
      setMessage(responseJason.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
          <h1>{message}</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="card">
        <button onClick={handleClick}>Say Hello</button>
      </div>
    </>
  );
}

export default App;