import { useEffect, useState } from "react";
import DifficultyFilter from "../components/DifficultyFilter";
import AssignmentCard from "../components/AssignmentCard";
import SqlEditor from "../components/SqlEditor";

const API = "https://learningsql.onrender.com";

export default function AssignmentList() {
  const [assignments, setAssignments] = useState([]);
  const [level, setLevel] = useState("Easy");
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`${API}/api/assignments`)
      .then(res => res.json())
      .then(data => setAssignments(data));
  }, []);

  return (
    <div className="layout">
      {/* LEFT PANEL */}
      <aside className="sidebar">
        <h2>Assignments</h2>
        <DifficultyFilter level={level} setLevel={setLevel} />

        {assignments
          .filter(a => (a.difficulty || "Easy") === level)
          .map(a => (
            <AssignmentCard
              key={a._id}
              assignment={a}
              onSelect={setSelected}
            />
          ))}
      </aside>

      {/* RIGHT PANEL */}
      <main className="workspace">
        {selected ? (
          <>
            <h2>{selected.title}</h2>
            <p className="question">{selected.question}</p>

            <SqlEditor query={query} setQuery={setQuery} />

            <button className="run-btn">Run Query</button>
            <button className="hint-btn">Get Hint</button>
          </>
        ) : (
          <p>Select an assignment to start</p>
        )}
      </main>
    </div>
  );
}
