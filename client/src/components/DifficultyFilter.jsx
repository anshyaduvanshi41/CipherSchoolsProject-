export default function DifficultyFilter({ level, setLevel }) {
  return (
    <div className="difficulty-filter">
      {["Easy", "Medium", "Hard"].map(l => (
        <button
          key={l}
          className={level === l ? "active" : ""}
          onClick={() => setLevel(l)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
