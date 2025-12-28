import { useEffect, useState } from "react";
import { getAssignments } from "../api/api";

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [level, setLevel] = useState("Easy");
  const [active, setActive] = useState(null);

  useEffect(() => {
    getAssignments()
      .then(data => {
        setAssignments(data);
      })
      .catch(err => {
        console.error("Assignment fetch error:", err);
      });
  }, []);

  const filtered = assignments.filter(
    a => a.description === level
  );

  return (
    <div style={{ display: "flex", height: "100vh", background: "#020617", color: "#fff" }}>
      
      {/* LEFT PANEL */}
      <div style={{ width: "40%", padding: "20px" }}>
        <h2>Assignments</h2>

        <div style={{ marginBottom: "20px" }}>
          {["Easy", "Medium", "Hard"].map(l => (
            <button
              key={l}
              onClick={() => {
                setLevel(l);
                setActive(null);
              }}
              style={{
                marginRight: "10px",
                padding: "8px 14px",
                background: level === l ? "#22d3ee" : "#1e293b",
                color: "#000",
                border: "none",
                cursor: "pointer"
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {filtered.length === 0 && <p>No assignments</p>}

        {filtered.map(a => (
          <div
            key={a._id}
            onClick={() => setActive(a)}
            style={{
              padding: "12px",
              marginBottom: "10px",
              background: "#0f172a",
              border: active?._id === a._id
                ? "2px solid #22d3ee"
                : "1px solid #334155",
              cursor: "pointer"
            }}
          >
            <h4>{a.title}</h4>
            <p>{a.question}</p>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL */}
      <div style={{ width: "60%", padding: "20px", background: "#020617" }}>
        {!active ? (
          <h3>Select an assignment to start</h3>
        ) : (
          <>
            <h2>{active.title}</h2>
            <p>{active.question}</p>

            <h4>Sample Tables</h4>
            {active.sampleTables.map(t => (
              <div key={t.tableName}>
                <strong>{t.tableName}</strong>
                <ul>
                  {t.columns.map(c => (
                    <li key={c.columnName}>
                      {c.columnName} ({c.dataType})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
