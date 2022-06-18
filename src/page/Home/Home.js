import React, { useState } from "react";
import { QuizCard, QuizContainer } from "../../components";

import "./Home.css";
export function Home() {
  const [quizResult, setQuizResult] = useState([]);
  const [page, setPage] = useState("allQuiz");

  return (
    <div className="home">
      <header>
        <h1
          className="
    "
        >
          Quiz App
        </h1>
      </header>
      <main className="main">
        {page === "allQuiz" ? (
          <QuizCard setPage={setPage} />
        ) : (
          <QuizContainer
            page={page}
            setPage={setPage}
            quizResult={quizResult}
            setQuizResult={setQuizResult}
          />
        )}
      </main>
    </div>
  );
}
