import React from "react";
import { useState, useEffect } from "react";

function Buggy() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div>
      <h3>Timer: {count}</h3>

      <div className="flex gap-1 mb-2">
        <button
          className="btn btn-primary"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="btn btn-secondary" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--warning)",
        }}
      >
        ⚠️ Try: Start timer, then stop it. Timer keeps running! Memory leak!
      </p>
    </div>
  );
}

export default Buggy;
