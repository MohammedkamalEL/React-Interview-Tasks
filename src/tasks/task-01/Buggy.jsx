import React from "react";
import { useState } from "react";

function Buggy() {
  const [items, setItems] = useState([
    { id: 1, name: "Apple", quantity: 5 },
    { id: 2, name: "Banana", quantity: 3 },
    { id: 3, name: "Orange", quantity: 7 },
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "New Item",
      quantity: 1,
    };
    setItems([newItem, ...items]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  };

  return (
    <div>
      <h3>Inventory Manager</h3>
      <div className="flex gap-1 mb-2">
        <button className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
        <button className="btn btn-secondary" onClick={shuffleItems}>
          Shuffle
        </button>
      </div>

      <ul className="item-list">
        {items.map((item, index) => (
          <li key={item.id} className="list-item">
            <div>
              <strong>{item.name}</strong>
              <input
                type="text"
                defaultValue={item.quantity}
                style={{ width: "60px", marginLeft: "10px" }}
              />
            </div>
            <button
              className="btn btn-danger"
              onClick={() => removeItem(index)}
              style={{ padding: "0.5rem 1rem" }}
            >
              Remove
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
        ⚠️ Try: Add items, change quantities, then shuffle. Notice input values
        don't follow their items!
      </p>
    </div>
  );
}

export default Buggy;
