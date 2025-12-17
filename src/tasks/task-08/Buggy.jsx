import React from "react";
import { useState, memo, useCallback } from "react";

const ExpensiveChild = memo(({ onClick, label }) => {
  console.log(`ExpensiveChild "${label}" rendered`);

  return (
    <div
      style={{
        padding: "var(--spacing-sm)",
        background: "var(--bg-secondary)",
        borderRadius: "var(--radius-md)",
        marginBottom: "var(--spacing-xs)",
      }}
    >
      <button className="btn btn-secondary" onClick={onClick}>
        {label}
      </button>
    </div>
  );
});

function Buggy() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);
  const h1 = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);
  const h2 = useCallback(() => {
    setCount((prev) => prev + 2);
  }, []);
  const h3 = useCallback(() => {
    setCount((prev) => prev + 3);
  }, []);
  return (
    <div>
      <h3>Count: {count}</h3>
      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
        Other State: {otherState}
      </p>

      <div className="mb-2">
        <button
          className="btn btn-primary"
          onClick={() => setOtherState(otherState + 1)}
        >
          Update Other State
        </button>
      </div>

      {/* BUG: New function created every render */}
      <ExpensiveChild label="Button 1" onClick={h1} />
      <ExpensiveChild label="Button 2" onClick={h2} />
      <ExpensiveChild label="Button 3" onClick={h3} />

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--warning)",
        }}
      >
        ⚠️ Check console: All children re-render when "Other State" changes!
      </p>
    </div>
  );
}

export default Buggy;
