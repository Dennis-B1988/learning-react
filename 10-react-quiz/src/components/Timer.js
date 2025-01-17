import { useEffect } from 'react';
import { useQuiz } from '../hooks/useQuiz';

function Timer() {
  const { secondsRemaining, dispatch } = useQuiz();
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div className="timer">
      {minutes}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}

export default Timer;
