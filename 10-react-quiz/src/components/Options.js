function Options({ option, dispatch, answer, question, index }) {
  const hasAnswered = answer !== null;
  const answerStatus = index === question.correctOption ? 'correct' : 'wrong';

  return (
    <button
      className={`btn btn-option ${index === answer ? 'answer' : ''}  ${hasAnswered ? answerStatus : ''}`}
      key={option}
      onClick={() => dispatch({ type: 'newAnswer', payload: index })}
      disabled={hasAnswered}
    >
      {option}
    </button>
  );
}

export default Options;
