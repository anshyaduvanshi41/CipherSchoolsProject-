import { useEffect, useState } from "react";
import { getAssignments } from "../api/api";
import "../styles/assignments.scss";

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssignments()
      .then(data => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Assignment fetch error", err);
        setLoading(false);
      });
  }, []);

  const filtered = assignments.filter(
    a => a.difficulty?.toLowerCase() === difficulty
  );

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>Assignments</h2>

        <div className="tabs">
          {[
            { label: "Easy", value: "easy" },
            { label: "Medium", value: "medium" },
            { label: "Hard", value: "hard" }
          ].map(d => (
            <button
              key={d.value}
              className={difficulty === d.value ? "active" : ""}
              onClick={() => {
                setDifficulty(d.value);
                setSelected(null);
              }}
            >
              {d.label}
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
              className={`card ${selected?._id === a._id ? "selected" : ""}`}
              onClick={() => setSelected(a)}
            >
              <h4>{a.title}</h4>
              <p>{a.question}</p>
            </div>
          ))}
        </div>
      </aside>

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
                      {c.columnName} — {c.dataType}
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
