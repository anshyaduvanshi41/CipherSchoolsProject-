import React, { useState } from 'react';
import { executeSQL, getHint } from '../api/api.js';
import '../styles/assignments.scss';

const SqlEditor = ({ assignment }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hintLoading, setHintLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExecute = async () => {
    if (!query.trim()) {
      setError('Please enter a SQL query');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await executeSQL(query);
      if (response.error) {
        setError(response.error);
        setResult(null);
      } else {
        setResult(response);
        setError(null);
      }
    } catch (err) {
      setError('Failed to execute query: ' + err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGetHint = async () => {
    if (!assignment) return;

    setHintLoading(true);
    setError(null);

    try {
      const response = await getHint(assignment.question, query);
      if (response.error) {
        setError('Failed to get hint: ' + response.error);
      } else {
        setHint(response.hint);
      }
    } catch (err) {
      setError('Failed to get hint: ' + err.message);
    } finally {
      setHintLoading(false);
    }
  };

  return (
    <div className="sql-editor">
      <div className="editor-header">
        <h1>{assignment.title}</h1>
        <p className="difficulty" style={{
          color: assignment.difficulty === 'easy' ? '#10b981' : 
                 assignment.difficulty === 'medium' ? '#f59e0b' : 
                 '#ef4444'
        }}>
          {assignment.difficulty?.toUpperCase()}
        </p>
      </div>

      <div className="assignment-details">
        <div className="question-section">
          <h3>Question</h3>
          <p>{assignment.question}</p>
        </div>

        {assignment.sampleTables && assignment.sampleTables.length > 0 && (
          <div className="tables-section">
            <h3>Sample Tables</h3>
            {assignment.sampleTables.map((table) => (
              <div key={table.tableName} className="table-info">
                <h4>{table.tableName}</h4>
                <div className="columns-list">
                  {table.columns.map((col) => (
                    <span key={col.columnName} className="column">
                      {col.columnName} ({col.dataType})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="editor-section">
        <h3>Write Your SQL Query</h3>
        <textarea
          className="sql-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SELECT * FROM table_name;"
          rows="8"
        />

        <div className="button-group">
          <button 
            className="btn btn-primary" 
            onClick={handleExecute}
            disabled={loading}
          >
            {loading ? 'Executing...' : '▶ Execute'}
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handleGetHint}
            disabled={hintLoading}
          >
            {hintLoading ? 'Getting Hint...' : '💡 Get Hint'}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {hint && (
          <div className="hint-box">
            <strong>Hint:</strong>
            <p>{hint}</p>
            <button 
              className="close-hint"
              onClick={() => setHint(null)}
            >
              ✕
            </button>
          </div>
        )}

        {result && (
          <div className="result-section">
            <h4>Results</h4>
            {Array.isArray(result) && result.length > 0 ? (
              <div className="results-table">
                <table>
                  <thead>
                    <tr>
                      {Object.keys(result[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((val, colIdx) => (
                          <td key={colIdx}>{String(val)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-results">No results returned</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SqlEditor;
