import React from 'react';
import './App.scss';

type QuestionType = {
  title: string;
  variants: string[];
  correct: number;
}

interface TestProps {
  question: QuestionType,
  onClickQuestion: (index: number) => void,
  step: number
}

interface ResultProps {
  correct: number
}

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Какая компания разработала React JS?',
    variants: ['Twitter', 'Google', 'Facebook'],
    correct: 2,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
  {
    title: 'Что такое виртуальная DOM?',
    variants: [
      'Точная HTML-копия реальной DOM',
      'Объект JavaScript, содержащий элементы и данные',
      'Строка JSON, содержащая элементы и данные, возвращаемые из метода react.render',
    ],
    correct: 1,
  },
];

const Test: React.FC<TestProps> = ({ step, question, onClickQuestion }) => {
  const percent = Math.round(step / questions.length * 100)

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percent}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((text, index) => (
            <li onClick={() => onClickQuestion(index)} key={index} >{text}</li>
          ))
        }
      </ul>
    </>
  )
}

const Result: React.FC<ResultProps> = ({ correct }) => {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>{`Вы отгодали ${correct} ответа из ${questions.length}`}</h2>
      <a href="/"><button>Попробовать снова</button></a>
    </div>
  )
}

const App: React.FC = () => {
  const [step, setStep] = React.useState<number>(0)
  const [correct, setCorrect] = React.useState<number>(0)

  const question = questions[step]

  const onClickQuestion = (index: number) => {
    setStep(step + 1)
    if (index === question.correct) {
      setCorrect(correct + 1)
    }
  }

  return (
    <div className="app">
      {
        step !== questions.length
          ? <Test step={step} question={question} onClickQuestion={onClickQuestion} />
          : <Result correct={correct} />
      }
    </div>
  );
}

export default App;
