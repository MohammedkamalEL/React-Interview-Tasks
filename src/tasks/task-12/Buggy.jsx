import React from "react";
import { useState, useEffect } from "react";

function Buggy() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controol = new AbortController();
    let cle;
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      signal: controol.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        cle = setTimeout(() => {
          setUserData(data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("======cancle++ is "+ userId);
        } else {
          console.log("real Error");
        }
      });
    return () => {
      controol.abort();
      if(cle){
        clearTimeout(cle)
      }
    };
  }, [userId]);

  return (
    <div>
      <h3>User Profile</h3>

      <div className="mb-2">
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Select User ID:
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((id) => (
            <button
              key={id}
              className={`btn ${
                userId === id ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setUserId(id)}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "var(--bg-primary)",
          padding: "var(--spacing-md)",
          borderRadius: "var(--radius-md)",
          minHeight: "100px",
        }}
      >
        {loading && <p>Loading...</p>}
        {userData && (
          <div>
            <h4>{userData.name}</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              {userData.email}
            </p>
          </div>
        )}
      </div>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--warning)",
        }}
      >
        ⚠️ Try: Click through users quickly. Wrong user data may appear!
      </p>
    </div>
  );
}

export default Buggy;
