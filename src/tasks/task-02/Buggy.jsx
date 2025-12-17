import React from "react";
import { useState, useEffect } from "react";

function Buggy() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [handlers, setHandlers] = useState([]);

  // useEffect(() => {
  //   const newHandlers = [];
  //   for (let i = 0; i < 3; i++) {
  //     newHandlers.push(() => {
  //       console.log(count);
  //       const message = `Button ${i + 1} clicked! Count: ${count}`;
  //       // setMessages([...messages, message]);
  //       setMessages((prevMessage) => [...prevMessage, message]);
  //     });
  //   }
  //   setHandlers(newHandlers);
  // }, []);
  function handle(bnum) {
    setMessages((prevM) => [
      ...prevM,
      `Button ${bnum} clicked! Count: ${count}`,
    ]);
  }
  return (
    <div>
      <h3>Counter: {count}</h3>
      <button
        className="btn btn-success mb-2"
        onClick={() => setCount(count + 1)}
      >
        Increment Counter
      </button>

      <div className="mb-2">
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Click buttons below after incrementing:
        </p>
        {[1, 2, 3].map((idx) => (
          <button
            key={idx}
            className="btn btn-primary"
            onClick={() => handle(idx)}
            style={{ margin: "0.25rem" }}
          >
            Button {idx + 1}
          </button>
        ))}
      </div>

      <div
        style={{
          background: "var(--bg-primary)",
          padding: "var(--spacing-sm)",
          borderRadius: "var(--radius-md)",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        <strong>Messages:</strong>
        {messages.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No messages yet</p>
        ) : (
          <ul style={{ listStyle: "none", marginTop: "0.5rem" }}>
            {messages.map((msg, idx) => (
              <li
                key={idx}
                style={{ padding: "0.25rem 0", fontSize: "0.9rem" }}
              >
                {msg}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--warning)",
        }}
      >
        ⚠️ Try: Increment counter to 5, then click any button. It shows count =
        0!
      </p>
    </div>
  );
}

export default Buggy;
