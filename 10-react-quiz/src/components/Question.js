import { useQuiz } from '../hooks/useQuiz';
import Options from './Options';

function Question() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <Options question={question} option={option} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Question;
