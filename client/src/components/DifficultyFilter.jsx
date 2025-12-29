import React from 'react';
import '../styles/assignments.scss';

const DifficultyFilter = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficulties = ['easy', 'medium', 'hard'];

  return (
    <div className="difficulty-filter">
      <h3>🎯 Difficulty Level</h3>
      <div className="filter-buttons">
        <button
          className={`filter-btn ${selectedDifficulty === null ? 'active' : ''}`}
          onClick={() => onDifficultyChange(null)}
        >
          All Levels
        </button>
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            className={`filter-btn ${
              selectedDifficulty === difficulty ? 'active' : ''
            }`}
            onClick={() => onDifficultyChange(difficulty)}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultyFilter;