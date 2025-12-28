export default function AssignmentCard({ assignment, onSelect }) {
  return (
    <div className="assignment-card" onClick={() => onSelect(assignment)}>
      <div className="card-header">
        <h3>{assignment.title}</h3>
        <span className={`badge ${(assignment.description || "Easy").toLowerCase()}`}>
          {assignment.description || "Easy"}
        </span>
      </div>

      <p className="description">{assignment.description}</p>
    </div>
  );
}
