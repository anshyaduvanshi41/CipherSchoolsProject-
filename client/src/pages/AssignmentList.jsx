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

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const data = await getAssignments();
      setAssignments(data);
      setFilteredAssignments(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setLoading(false);
    }
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    
    if (difficulty === null) {
      setFilteredAssignments(assignments);
    } else {
      const filtered = assignments.filter(
        (assignment) => assignment.difficulty?.toLowerCase() === difficulty.toLowerCase()
      );
      setFilteredAssignments(filtered);
    }
    
    // Reset selected assignment when filtering
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
          {filteredAssignments.length === 0 ? (
            <p className="no-assignments">No assignments found</p>
          ) : (
            filteredAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment._id}
                assignment={assignment}
                isSelected={selectedAssignment?._id === assignment._id}
                onSelect={() => setSelectedAssignment(assignment)}
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
