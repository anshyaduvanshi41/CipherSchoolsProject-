import { useEffect, useState } from "react";
import { getAssignments } from "../api/api";
import "../styles/assignments.scss";

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [difficulty, setDifficulty] = useState("Easy");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAssignments();
        setAssignments(data);
      } catch (err) {
        console.error("Failed to load assignments", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // IMPORTANT: filter safe rakha hai
  const filtered = assignments.filter(
    a =>
      a.description &&
      a.description.toLowerCase() === difficulty.toLowerCase()
  );

  return (
    <div className="layout">
      {/* LEFT SIDEBAR */}
      <aside className="sidebar">
        <h2>Assignments</h2>

        <div className="tabs">
          {["Easy", "Medium", "Hard"].map(d => (
            <button
              key={d}
              className={difficulty === d ? "active" : ""}
              onClick={() => {
                setDifficulty(d);
                setSelected(null);
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {loading && <p className="muted">Loading...</p>}
        {!loading && filtered.length === 0 && (
          <p className="muted">No assignments available</p>
        )}

        <div className="list">
          {filtered.map(a => (
            <div
              key={a._id}
              className={`card ${
                selected?._id === a._id ? "selected" : ""
              }`}
              onClick={() => setSelected(a)}
            >
              <h4>{a.title}</h4>
              <p>{a.question}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="content">
        {!selected ? (
          <div className="empty">
            <h2>Select an assignment to start</h2>
            <p>Choose a problem from the left panel</p>
          </div>
        ) : (
          <>
            <h1>{selected.title}</h1>
            <p className="question">{selected.question}</p>

            <h3>Sample Tables</h3>
            {selected.sampleTables?.map(t => (
              <div key={t.tableName} className="table-box">
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
      </main>
    </div>
  );
}
