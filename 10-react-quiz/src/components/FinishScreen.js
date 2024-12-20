import { useQuiz } from '../hooks/useQuiz';

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;

  if (percentage === 100) emoji = '🥇';
  else if (percentage >= 80) emoji = '🎉';
  else if (percentage >= 50) emoji = '👍';
  else if (percentage >= 0) emoji = '🤨';
  else emoji = '👎';

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of <strong>{maxPossiblePoints}</strong> (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
