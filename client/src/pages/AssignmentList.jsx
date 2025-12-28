import React, { useState, useEffect } from 'react';
import { getAssignments } from '../api/api.js';
import DifficultyFilter from '../components/DifficultyFilter.jsx';
import AssignmentCard from '../components/AssignmentCard.jsx';
import SqlEditor from '../components/SqlEditor.jsx';
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
      console.log('Fetching assignments...');
      
      const data = await getAssignments();
      console.log('Assignments received:', data);
      
      if (!data || data.length === 0) {
        console.warn('No assignments found in database');
        setError('No assignments found. Please add assignments to the database.');
      }
      
      setAssignments(data || []);
      setFilteredAssignments(data || []);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setError(`Failed to load assignments: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDifficultyChange = (difficulty) => {
    console.log('Filtering by difficulty:', difficulty);
    setSelectedDifficulty(difficulty);
    
    if (difficulty === null) {
      setFilteredAssignments(assignments);
    } else {
      const filtered = assignments.filter(
        (assignment) => assignment.difficulty?.toLowerCase() === difficulty.toLowerCase()
      );
      console.log('Filtered assignments:', filtered);
      setFilteredAssignments(filtered);
    }
    
    setSelectedAssignment(null);
  };

  if (loading) {
    return <div className="loading">Loading assignments...</div>;
  }

  return (
    <div className="assignment-list-container">
      <aside className="assignment-sidebar">
        <DifficultyFilter 
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={handleDifficultyChange}
        />
        
        <div className="assignment-cards">
          {error && (
            <div className="error-box">
              <p>{error}</p>
              <button onClick={fetchAssignments} className="retry-btn">
                Retry
              </button>
            </div>
          )}
          
          {filteredAssignments.length === 0 ? (
            <p className="no-assignments">No assignments found</p>
          ) : (
            filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id || assignment.id}
                assignment={assignment}
                isSelected={selectedAssignment?._id === assignment._id}
                onSelect={() => {
                  console.log('Selected assignment:', assignment);
                  setSelectedAssignment(assignment);
                }}
              />
            ))
          )}
        </div>
      </aside>

      <main className="assignment-editor">
        {selectedAssignment ? (
          <SqlEditor assignment={selectedAssignment} />
        ) : (
          <div className="no-selection">
            <h2>Select an assignment to start</h2>
            <p>Choose a problem from the left panel</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AssignmentList;