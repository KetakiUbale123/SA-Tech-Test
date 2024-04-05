import React, { useState } from 'react';
import { QUESTIONS } from './questions';

const App = () => {
  const [answers, setAnswers] = useState({});
  const [runScores, setRunScores] = useState([]);
  const [averageScore, setAverageScore] = useState(null);

  const handleAnswerChange = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const yesCount = Object.values(answers).filter(answer => answer === 'Yes').length;
    const score = yesCount / Object.keys(QUESTIONS).length * 100;
    return score.toFixed(2);
  };

  const handleRun = () => {
    const score = calculateScore();
    setRunScores([...runScores, score]);
    setAverageScore(calculateAverage([...runScores, score]));
    setAnswers({});
    alert(`Your score for this run: ${score}%`);
  };

  const calculateAverage = scores => {
    if (scores.length === 0) return null;
    const total = scores.reduce((acc, curr) => acc + parseFloat(curr), 0);
    return (total / scores.length).toFixed(2);
  };

    return (
    <div>
      <h1>Yes/No Questionnaire</h1>
      {Object.entries(QUESTIONS).map(([id, question]) => (
        <div key={id}>
          <p>{question}</p>
          <div>
            <label>
              <input
                type="radio"
                name={`question_${id}`}
                value="Yes"
                onChange={() => handleAnswerChange(id, 'Yes')}
                checked={answers[id] === 'Yes'}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name={`question_${id}`}
                value="No"
                onChange={() => handleAnswerChange(id, 'No')}
                checked={answers[id] === 'No'}
              />
              No
            </label>
          </div>
        </div>
      ))}
      <button onClick={handleRun}>Submit</button>
      {averageScore !== null && <p>Average score: {averageScore}%</p>}
      </div>
    );
};


export default App;
