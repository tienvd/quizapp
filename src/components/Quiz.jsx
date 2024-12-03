import React, { useRef, useState, useEffect } from "react";
import "./Quiz.css";

import { data } from "../assets/data";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  // Hàm trộn mảng
  const shuffleArray = (array) => {
    return array
      .map((item) => ({ ...item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item) => {
        delete item.sort;
        return item;
      });
  };

  // Trộn dữ liệu khi ứng dụng khởi chạy
  useEffect(() => {
    const shuffledData = shuffleArray(data);
    setQuizData(shuffledData);
    setQuestion(shuffledData[0]);
  }, []);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock) {
      if (index === quizData.length - 1) {
        setResult(true);
        return;
      }
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setQuestion(quizData[nextIndex]);
      setLock(false);
      optionArray.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
      });
    }
  };

  const reset = () => {
    const shuffledData = shuffleArray(data);
    setQuizData(shuffledData);
    setQuestion(shuffledData[0]);
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>
            Đúng {score} trên {quizData.length} câu nha bé
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            Câu {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={Option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {quizData.length}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
