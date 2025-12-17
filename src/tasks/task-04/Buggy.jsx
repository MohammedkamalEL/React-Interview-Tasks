import React from "react";
import { useState } from "react";

function Buggy() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);

  const incrementThreeTimes = () => {
    setCount((prevC) => prevC + 1);
    setCount((prevC) => prevC + 1);
    setCount((prevC) => prevC + 1);
    // setCount(count + 1);
    // setCount(count + 1);
  };

  const delayedIncrement = () => {
    setTimeout(() => {
      setCount((prev) => prev + 1);
      setLog((prevL) => [...prevL, `Incremented to ${count + 1}`]);
    }, 1000);
  };

  return (
    <div>
      <h3>Count: {count}</h3>

      <div className="flex flex-col gap-1 mb-2">
        <button className="btn btn-primary" onClick={incrementThreeTimes}>
          Increment 3 Times (Broken)
        </button>

        <button className="btn btn-secondary" onClick={delayedIncrement}>
          Delayed Increment (1s)
        </button>

        <button className="btn btn-success" onClick={() => {
          setCount(0)
          setLog([])
        }}>
          Reset
        </button>
      </div>

      <div
        style={{
          background: "var(--bg-primary)",
          padding: "var(--spacing-sm)",
          borderRadius: "var(--radius-md)",
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >
        <strong>Log:</strong>
        {log.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            No logs yet
          </p>
        ) : (
          <ul style={{ listStyle: "none", marginTop: "0.5rem" }}>
            {log.map((entry, idx) => (
              <li
                key={idx}
                style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}
              >
                {entry}
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
        ⚠️ Try: Click "Increment 3 Times" - only adds 1! Click delayed multiple
        times fast.
      </p>
    </div>
  );
}

export default Buggy;
