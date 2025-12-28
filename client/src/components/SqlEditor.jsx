export default function SqlEditor({ query, setQuery }) {
  return (
    <div className="sql-editor">
      <h4>Your SQL Query</h4>
      <textarea
        placeholder="SELECT * FROM employees;"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  );
}
