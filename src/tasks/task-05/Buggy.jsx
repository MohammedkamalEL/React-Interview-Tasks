import React from "react";
import { useState, useEffect } from "react";

function Buggy() {
  const [count, setCount] = useState(5);
  const [multiplier, setMultiplier] = useState(2);
  const [result, setResult] = useState(10);

  useEffect(() => {
    console.log("Effect running! Calculating result...");
    setResult(count * multiplier);
  }, [count, multiplier]);

  return (
    <div>
      <h3>Calculator</h3>

      <div className="mb-2">
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Count: {count}
        </label>
        {/* <input
          type="range"
          min="0"
          max="10"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ width: "100%" }}
        /> */}
        <span>Count is : {count}</span>
        <input
          type="range"
          min={0}
          max={10}
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        />
      </div>

      <div className="mb-2">
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Multiplier: {multiplier}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      <div
        style={{
          background: "var(--bg-primary)",
          padding: "var(--spacing-md)",
          borderRadius: "var(--radius-md)",
          textAlign: "center",
          marginBottom: "var(--spacing-sm)",
        }}
      >
        <h2>
          {count} × {multiplier} = {result}
        </h2>
      </div>

      <div
        style={{
          background: "var(--bg-secondary)",
          padding: "var(--spacing-sm)",
          borderRadius: "var(--radius-md)",
          fontSize: "0.9rem",
        }}
      >
        <p
          style={{
            marginBottom: "0.5rem",
            color:
              result === count * multiplier ? "var(--success)" : "var(--error)",
          }}
        >
          <strong>Expected:</strong> {count} × {multiplier} ={" "}
          {count * multiplier}
        </p>
        <p
          style={{
            marginBottom: 0,
            color:
              result === count * multiplier ? "var(--success)" : "var(--error)",
          }}
        >
          <strong>Actual Result:</strong> {result}
        </p>
        {result !== count * multiplier && (
          <p
            style={{
              marginTop: "0.5rem",
              marginBottom: 0,
              color: "var(--error)",
              fontWeight: "bold",
            }}
          >
            ❌ MISMATCH! Result is stale!
          </p>
        )}
      </div>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--warning)",
        }}
      >
        ⚠️ Try: Change multiplier slider - result uses OLD multiplier value!
        Check console for effect logs.
      </p>
    </div>
  );
}

export default Buggy;
