import React from "react";
import { useState, useMemo } from "react";
import "./Question.css";


const Question = ({ question, incorrect_answers, correct_answer, nextQuestion }) => {



    const [message, setMessage] = useState("Choose your answer")

    const [inputValue, setInputValue] = useState('');

    function randomize(arr) {
        let shuffledArr = [];

        while (arr.length > 0) {
            let r = Math.floor(Math.random() * arr.length);
            let item = arr.splice(r, 1)[0];
            shuffledArr.push(item);
        }

        return shuffledArr;
    };


    function removeSpecialCharacters(str) {
        return str.replace(/[^a-zA-Z0-9 _-]/g, '');
    }
    const cleanedQuestion = removeSpecialCharacters(question);
    const handleSubmit = (e) => {

        e.preventDefault();
        if (inputValue === correct_answer) {
            setMessage("CORRECT")
            nextQuestion(true);
            setTimeout(() => {
                setMessage("Choose your answer");
            }, 1000)
        } else {
            setMessage("Wrong");
            setTimeout(() => {
                setMessage("Choose your answer");
            }, 1000)
        }
    };

    const choices = useMemo(() => randomize([...incorrect_answers, correct_answer]), [incorrect_answers, correct_answer]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <>
            <h2>{cleanedQuestion}?</h2>
            <div className="question-container">
                <form onSubmit={handleSubmit}>
                    {choices.map((choice, index) => (
                        <div key={index}>
                            <input type="radio" name="choice" value={choice} onChange={handleInputChange} />
                            <label>{choice}</label>
                        </div>
                    ))}
                    <button>Check</button>
                </form>
                <p>{message}</p>
            </div>
        </>
    );

}

export default Question