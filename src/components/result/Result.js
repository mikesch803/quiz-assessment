import React from "react";
import "./Result.css";
export function Result({ quizResult }) {
  const quizDatas = (que) => Object.values(que);

  const showCorrectAns = (num1, num2, operator) => {
    let ans = "";
    if (operator === "+") {
      ans = num1 + num2;
    } else if (operator === "-") {
      ans = num1 - num2;
    } else if (operator === "*") {
      ans = num1 * num2;
    } else {
      ans = num1 / num2;
    }
    return ans;
  };

  let totalScore = 0;

  return (
    <div>
      <h2 className="flex">
        Results<span className="btn-quiz btn-back">back to home</span>
      </h2>
      {quizResult.map((item, index) => (
        <li key={index}>
          <h3>{Object.keys(item)}</h3>
          {quizDatas(item)[0].map((q) => (
            <li
              style={
                q.answer !=
                showCorrectAns(q.randomNum1, q.randomNum2, q.operator)
                  ? { backgroundColor: "red" }
                  : { backgroundColor: "green" }
              }
              key={q.queNo}
              className="each-que"
            >
              <h2>
                <span>{q.queNo}.</span> {q.randomNum1}
                {q.operator}
                {q.randomNum2}{" "}
              </h2>
              <p>
                correct ans :{" "}
                {showCorrectAns(q.randomNum1, q.randomNum2, q.operator)}
              </p>{" "}
              <p>your answer : {q.answer}</p>
              <p>
                current score :{" "}
                {q.answer ==
                showCorrectAns(q.randomNum1, q.randomNum2, q.operator)
                  ? (totalScore = totalScore + 1)
                  : totalScore}
              </p>
            </li>
          ))}
        </li>
      ))}
      <h4 className="total-score">Total Score : {totalScore}</h4>
    </div>
  );
}
