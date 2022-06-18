import React from "react";
import { totalQuiz } from "../../data/totalQuiz";
export function QuizCard({setPage}) {
  return (
    <ul>
      {totalQuiz.map((quiz) => (
        <li key={quiz.title}>
          <section className="card-quiz">
            <h3>{quiz.title}</h3>
            <p>{quiz.description} </p>
            <button className="btn-quiz" onClick={()=>setPage(quiz.title)}>start quiz</button>
          </section>
        </li>
      ))}
    </ul>
  );
}
