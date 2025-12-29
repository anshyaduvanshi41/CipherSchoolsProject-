import React, { useState, useEffect } from 'react';
import { getAssignments } from '../api/api.js';
import DifficultyFilter from './DifficultyFilter.jsx';
import AssignmentCard from './AssignmentCard.jsx';
import SqlEditor from './SqlEditor.jsx';
import '../styles/assignments.scss';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAssignments();
      if (!data || data.length === 0) {
        setError('No assignments found. Please seed the database with sample data.');
        setAssignments([]);
        setFilteredAssignments([]);
      } else {
        setAssignments(data);
        setFilteredAssignments(data);
      }
    } catch (err) {
      setError(`Failed to load assignments: ${err.message}`);
      setAssignments([]);
      setFilteredAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    if (difficulty === null) {
      setFilteredAssignments(assignments);
    } else {
      const filtered = assignments.filter(
        (assignment) =>
          assignment.difficulty?.toLowerCase() === difficulty.toLowerCase()
      );
      setFilteredAssignments(filtered);
    }
    setSelectedAssignment(null);
  };

  return (
    <div className="assignment-list-container">
      {/* Sidebar */}
      <aside className="assignment-sidebar">
        <DifficultyFilter
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={handleDifficultyChange}
        />

        <div className="assignments-header">
          <h3>📚 Assignments</h3>
          <span className="count">{filteredAssignments.length}</span>
        </div>

        {loading && (
          <div className="loading">
            <span className="spinner"></span>
            <p>Loading assignments...</p>
          </div>
        )}

        {error && !loading && (
          <div className="sidebar-error">
            <p>⚠️ {error}</p>
            <button onClick={fetchAssignments} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredAssignments.length === 0 && (
          <div className="empty-list">
            <p>No assignments found for this difficulty level</p>
          </div>
        )}

        <div className="assignment-cards">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              isSelected={selectedAssignment?._id === assignment._id}
              onSelect={() => setSelectedAssignment(assignment)}
            />
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="editor-main">
        <SqlEditor assignment={selectedAssignment} />
      </main>
    </div>
  );
};

export default AssignmentList;