import React from "react";
import { useState,useMemo } from "react";

const fibonacci = (n) => {
  console.log(`Calculating fibonacci(${n})...`);
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function Buggy() {
  const [number, setNumber] = useState(10);
  const [count, setCount] = useState(0);

  const result = useMemo(() => {
    return fibonacci(number);
  }, [number]);

  return (
    <div>
      <div className="mb-2">
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Calculate Fibonacci of: {number}
        </label>
        <input
          type="range"
          min="1"
          max="35"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      <div
        style={{
          background: "var(--bg-primary)",
          padding: "var(--spacing-md)",
          borderRadius: "var(--radius-md)",
          marginBottom: "var(--spacing-sm)",
          textAlign: "center",
        }}
      >
        <h3>
          Fibonacci({number}) = {result}
        </h3>
      </div>

      <div className="mb-2">
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Unrelated counter: {count}
        </p>
        <button
          className="btn btn-secondary"
          onClick={() => setCount(count + 1)}
        >
          Increment Counter
        </button>
      </div>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--warning)",
        }}
      >
        ⚠️ Check console: Fibonacci recalculates even when you change the
        counter!
      </p>
    </div>
  );
}

export default Buggy;
