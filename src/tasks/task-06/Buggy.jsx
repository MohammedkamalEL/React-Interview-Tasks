import React from "react";
import { useState, useEffect } from "react";

function Buggy() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  console.log(data);
  useEffect(() => {
    console.log("Effect running...");
    setData((data) => [...data, count]);
  }, [count]);

  function hanedlRest() {
    setData([]);
  }
  return (
    <div>
      <h3>Counter: {count}</h3>
      <button
        className="btn btn-primary mb-2"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      <button className="btn btn-secandry" onClick={() => hanedlRest()}>
        Rest
      </button>

      <div
        style={{
          background: "var(--bg-primary)",
          padding: "var(--spacing-sm)",
          borderRadius: "var(--radius-md)",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        <strong>Data Array:</strong>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          {/* {data.length} items (growing infinitely!) */}
          {/* {JSON.stringify(data)} */}
          [{data.toString()}]
        </p>
      </div>

      <p
        style={{ marginTop: "1rem", fontSize: "0.9rem", color: "var(--error)" }}
      >
        ⚠️ Check console - effect runs infinitely! Page may freeze!
      </p>
    </div>
  );
}

export default Buggy;
