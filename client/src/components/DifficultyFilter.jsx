import React from 'react';
import '../styles/assignments.scss';

const DifficultyFilter = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className="difficulty-filter">
      <h3>Filter by Difficulty</h3>
      <div className="filter-buttons">
        {difficulties.map((level) => (
          <button
            key={level}
            className={`filter-btn ${selectedDifficulty === level ? 'active' : ''}`}
            onClick={() => onDifficultyChange(level)}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
        <button
          className={`filter-btn ${selectedDifficulty === null ? 'active' : ''}`}
          onClick={() => onDifficultyChange(null)}
        >
          All
        </button>
      </div>
    </div>
  );
};

export default DifficultyFilter;
