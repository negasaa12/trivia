import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Question from "./assets/Question";




const QuizGame = ({ questionsArr, handleGameScore, score }) => {


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


    console.log(score, "Score")
    // console.log("QUUIZ QUESTION", questions);
    // console.log("ONE QUESTION", oneQuestion);


    return (


        <div class="container">
            <h2 class="display-1" className="question-form-h1"  >Welcome To The {oneQuestion.category} Trivia</h2>
            <div class="container  bg-info mx-auto mb-2 p-3 rounded display-5" style={{ maxWidth: '250px' }}  >
                Score: {score}
            </div>
            <div  >
                {oneQuestion && (
                    <Question
                        handleGameScore={handleGameScore}
                        question={oneQuestion.question}
                        correct_answer={oneQuestion.correct_answer}
                        incorrect_answers={oneQuestion.incorrect_answers}
                        nextQuestion={nextQuestion}
                    />
                )}
            </div>
        </div>

    );



}

export default QuizGame