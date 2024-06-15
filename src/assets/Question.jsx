import React from "react";
import { useState, useMemo } from "react";
import "./Question.css";


const Question = ({ question, incorrect_answers, correct_answer, nextQuestion }) => {



    const [message, setMessage] = useState("Choose your answer")

    const [inputValue, setInputValue] = useState('');
    const [style, setStyle] = useState("message-p")
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
            setStyle("message-correct-p")

            nextQuestion(true);
            setTimeout(() => {
                setMessage("Choose your answer");
                setStyle("message-p")
            }, 1000)
        } else {
            setMessage("Wrong");
            setStyle("message-wrong-p")
            setTimeout(() => {
                setMessage("Choose your answer");
                setStyle("message-p")

            }, 1000)
        }
    };

    const choices = useMemo(() => randomize([...incorrect_answers, correct_answer]), [incorrect_answers, correct_answer]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <>  <div class="container text-center">
            <h2 class="display-5 " >{cleanedQuestion}?</h2>
            <div class="d-flex justify-content-center align-items-center" >
                <form onSubmit={handleSubmit}>
                    {choices.map((choice, index) => (
                        <div class="form-check" key={index}>
                            <input class="form-check-input" type="radio" name="choice" value={choice} onChange={handleInputChange} />
                            <label class="form-check-label">{choice}</label>
                        </div>
                    ))}
                    <button class="btn btn-info m-3">Check</button>
                </form>

            </div>
            <p className={style}>{message}</p>
        </div>


        </>
    );

}

export default Question