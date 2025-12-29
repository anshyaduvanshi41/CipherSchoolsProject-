import React from 'react';
import '../styles/assignments.scss';

const AssignmentCard = ({ assignment, isSelected, onSelect }) => {
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
    <div
      className={`assignment-card ${isSelected ? 'active' : ''}`}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect();
        }
      }}
      aria-selected={isSelected}
    >
      <div className="card-header">
        <h4>{assignment.title}</h4>
        <span
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(assignment.difficulty) }}
        >
          {assignment.difficulty?.charAt(0).toUpperCase()}
        </span>
      </div>
      <p className="card-description">
        {assignment.question.substring(0, 80)}...
      </p>
    </div>
  );
};

export default AssignmentCard;