import React, { useRef, useState } from "react";
import "./Quiz.css";

import { data } from "../assets/data";
const Quiz = () => {
  let [index, setindex] = useState(0);
  const [question, setquestion] = useState(data[index]);
  const [lock, setlock] = useState(false);
  const [score, setscore] = useState(0);
  const [result, setresult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];
  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setlock(true);
        setscore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setlock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };
  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setresult(true);
        return 0;
      }
      setindex(++index);
      setquestion(data[index]);
      setlock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };
  let reset = () => {
    setindex(0);
    setquestion(data[0]);
    setscore(0);
    setlock(false);
    setresult(false);
  };
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr></hr>
      {result ? (
        <>
          <h2>
            Đúng {score} trên {data.length} câu nha bé
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
            {index + 1} of {data.length}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
