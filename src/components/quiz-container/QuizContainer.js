import React, { useEffect, useState } from "react";
import { totalQuiz } from "../../data/totalQuiz";
import { Result } from "../result/Result";
import "./QuizContainer.css";
export function QuizContainer({ page, setPage, quizResult, setQuizResult }) {
    
  const randomNum1 = Math.floor(Math.random() * 9);
  const randomNum2 = Math.floor(Math.random() * 9);

  const [quizTimer, setQuizTimer] = useState(20);

  const [currQueNo, setCurrQueNo] = useState(1);

  const [currQue, setCurrQue] = useState({
    queNo: currQueNo,
    operator: "+",
    randomNum1: randomNum1,
    randomNum2: randomNum2,
    answer: "",
  });

  const [questionsData, setQuestionsData] = useState([]);

  const newQuestionHandler = () => {
    setQuestionsData([...questionsData, currQue]);
    setCurrQueNo((prev) => prev + 1);
    setCurrQue({
      queNo: currQueNo + 1,
      operator: currQue.operator,
      randomNum1: randomNum1,
      randomNum2: randomNum2,
      answer: "",
    });
    setQuizTimer(20);
  };

  const startNewQuizHandler = () => {
    setQuizResult([...quizResult, { [page]: [...questionsData, currQue] }]);
    setQuestionsData([]);
    setCurrQueNo(1);
    setCurrQue({
      queNo: currQueNo - currQueNo + 1,
      operator: "+",
      randomNum1: randomNum1,
      randomNum2: randomNum2,
      answer: "",
    });

    setPage(totalQuiz.filter((item) => item.title !== page)[0].title);
  };

  useEffect(() => {
    let quizTimer1 = quizTimer;
    let intervalID = setInterval(() => {
      if (quizTimer1 === 0) {
        startNewQuizHandler();
        quizTimer1 = 21;
      } else if (quizTimer1 === 0 && currQueNo === 5) {
        newQuestionHandler();
        quizTimer1 = 21;
      }
      quizTimer1 -= 1;
      setQuizTimer(quizTimer1);
    }, 1000);
    if (quizResult.length === totalQuiz.length) {
      clearInterval(intervalID);
    }
    return () => clearInterval(intervalID);
  }, [quizTimer, currQueNo]);

  if (quizResult.length === totalQuiz.length) {
    return <Result quizResult={quizResult} />;
  }

  return (
    <>
      <h2>{page}</h2>
      <div className="container-quiz">
        <h4>Question no. {currQueNo}</h4>
        <h4>Timer : {quizTimer}</h4>
        <h2>
          {currQue.randomNum1} {currQue.operator} {currQue.randomNum2}
        </h2>
        <label htmlFor="operator">Choose a operator:</label>
        <select
          name="operator"
          id="operator"
          onChange={(e) => setCurrQue({ ...currQue, operator: e.target.value })}
        >
          <option value="/">Divide</option>
          <option value="*">Multiply</option>
          <option value="+">Addition</option>
          <option value="-">Substraction</option>
        </select>
        <input
          className=""
          type="text"
          onChange={(e) => setCurrQue({ ...currQue, answer: e.target.value })}
          value={currQue.answer}
          required
        />

        {currQueNo === 5 ? (
          <button className="btn-quiz" onClick={startNewQuizHandler}>
            submit
          </button>
        ) : (
          <button className="btn-quiz" onClick={newQuestionHandler}>
            next
          </button>
        )}
      </div>
    </>
  );
}
