import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { executeSQL, getHint } from '../api/api.js';
import '../styles/assignments.scss';

const SqlEditor = ({ assignment }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [hint, setHint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hintLoading, setHintLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!assignment) {
    return (
      <div className="sql-editor">
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h2>No Assignment Selected</h2>
          <p>Choose an assignment from the left panel to start practicing SQL</p>
        </div>
      </div>
    );
  }

  const handleExecute = async () => {
    if (!query.trim()) {
      setError('Please enter a SQL query');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await executeSQL(query);
      if (response.error) {
        setError(`❌ ${response.error}`);
        setResult(null);
      } else {
        setResult(response);
        setSuccess(`✅ Query executed successfully! (${response.length} rows)`);
        setError(null);
      }
    } catch (err) {
      setError(`❌ Failed to execute query: ${err.message}`);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleGetHint = async () => {
    if (!query.trim()) {
      setError('Write your query first to get a hint');
      return;
    }

    setHintLoading(true);
    setError(null);

    try {
      const response = await getHint(assignment.question, query);
      if (response.error) {
        setError(`❌ Failed to get hint: ${response.error}`);
      } else {
        setHint(response.hint);
      }
    } catch (err) {
      setError(`❌ Failed to get hint: ${err.message}`);
    } finally {
      setHintLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'hard':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="sql-editor">
      {/* Header */}
      <div className="editor-header">
        <div>
          <h2>{assignment.title}</h2>
          <p className="assignment-question">{assignment.question}</p>
        </div>
        <span
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(assignment.difficulty) }}
        >
          {assignment.difficulty?.toUpperCase()}
        </span>
      </div>

      {/* Sample Data Section */}
      {assignment.sampleTables && assignment.sampleTables.length > 0 && (
        <div className="sample-data-section">
          <h3>📊 Sample Tables Schema</h3>
          <div className="sample-tables">
            {assignment.sampleTables.map((table, idx) => (
              <div key={idx} className="table-schema">
                <h4>{table.tableName}</h4>
                <table className="schema-table">
                  <thead>
                    <tr>
                      <th>Column Name</th>
                      <th>Data Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.columns?.map((col, colIdx) => (
                      <tr key={colIdx}>
                        <td className="column-name">{col.columnName}</td>
                        <td className="data-type">{col.dataType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor Section */}
      <div className="editor-section">
        <h3>✍️ Write Your SQL Query</h3>
        <div className="monaco-wrapper">
          <Editor
            height="300px"
            defaultLanguage="sql"
            value={query}
            onChange={(value) => {
              setQuery(value || '');
              setError(null);
            }}
            theme="light"
            options={{
              minimap: { enabled: false },
              wordWrap: 'on',
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 10 },
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="button-group">
          <button
            className="btn btn-primary"
            onClick={handleExecute}
            disabled={loading}
          >
            {loading ? '⏳ Executing...' : '▶️ Execute Query'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleGetHint}
            disabled={hintLoading}
          >
            {hintLoading ? '⏳ Loading...' : '💡 Get Hint'}
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="error-message">
          <strong>Error</strong>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="success-message">
          <p>{success}</p>
        </div>
      )}

      {/* Hint Box */}
      {hint && (
        <div className="hint-box">
          <div className="hint-header">
            <strong>💡 Hint from AI Tutor</strong>
            <button
              className="close-hint"
              onClick={() => setHint(null)}
              aria-label="Close hint"
            >
              ✕
            </button>
          </div>
          <p>{hint}</p>
        </div>
      )}

      {/* Results Section */}
      {result && result.length > 0 && (
        <div className="result-section">
          <h4>📈 Query Results</h4>
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
                {result.slice(0, 50).map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, colIdx) => (
                      <td key={colIdx}>
                        {val === null ? (
                          <span className="null-value">NULL</span>
                        ) : (
                          String(val)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {result.length > 50 && (
              <p className="results-note">
                Showing 50 of {result.length} rows
              </p>
            )}
          </div>
        </div>
      )}

      {/* Empty Results */}
      {result && result.length === 0 && (
        <div className="result-section">
          <p className="no-results">✅ Query executed successfully (0 rows)</p>
        </div>
      )}
    </div>
  );
};

export default SqlEditor;