import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Question from "./assets/Question";




const QuizGame = ({ questionsArr }) => {


    const [questions, setQuestions] = useState(questionsArr);

    const [oneQuestion, setOneQuestion] = useState(questions[0]);


    const nextQuestion = (answer) => {

        const newQ = questions.slice(1);

        setTimeout(() => {
            if (answer) {
                setQuestions(newQ)
                setOneQuestion(newQ[0] || null);
            }
        }, 1000);
    }



    console.log("QUUIZ QUESTION", questions);
    console.log("ONE QUESTION", oneQuestion);


    return (

        <>
            <h1 class="display-1" className="question-form-h1"  >Welcome To The {oneQuestion.category} Trivia</h1>
            <div  >
                {oneQuestion && (
                    <Question class="d-flex justify-content-center align-items-center"
                        question={oneQuestion.question}
                        correct_answer={oneQuestion.correct_answer}
                        incorrect_answers={oneQuestion.incorrect_answers}
                        nextQuestion={nextQuestion}
                    />
                )}
            </div>
        </>
    );



}

export default QuizGame