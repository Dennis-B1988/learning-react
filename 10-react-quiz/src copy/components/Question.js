import Options from './Options';

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <Options
            key={index}
            option={option}
            dispatch={dispatch}
            answer={answer}
            question={question}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Question;
