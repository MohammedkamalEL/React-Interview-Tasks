import React from "react";
import { useState } from "react";

function Buggy() {
  const [items, setItems] = useState([
    { id: 1, name: "Apples", count: 5 },
    { id: 2, name: "Bananas", count: 0 },
    { id: 3, name: "Oranges", count: 3 },
  ]);

  const decrementItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  return (
    <div>
      <h3>Inventory</h3>

      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="list-item">
            <div>
              <strong>{item.name}</strong>
              {item.count > 0 ? (
                <span style={{ marginLeft: "10px", color: "var(--primary)" }}>
                  ({item.count} in stock)
                </span>
              ) : (
                <span className="m-2">(Out of stock)</span>
              )}
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => decrementItem(item.id)}
              style={{ padding: "0.5rem 1rem" }}
            >
              Sell One
            </button>
          </li>
        ))}
      </ul>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--warning)",
        }}
      >
        ⚠️ Try: Click "Sell One" on Bananas until count reaches 0. Notice "0"
        appears!
      </p>
    </div>
  );
}

export default Buggy;
