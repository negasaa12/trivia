import React from "react";
import { useState, useMemo } from "react";
import "./Question.css";


const Question = ({ question, incorrect_answers, correct_answer, nextQuestion, handleGameScore }) => {



    const [message, setMessage] = useState("")

    const [inputValue, setInputValue] = useState('');
    const [style, setStyle] = useState("text-center")
    const [attempts, setattempts] = useState(0);

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
            handleGameScore("correct", attempts);
            setMessage("CORRECT");
            setStyle("bg-success text-center  text-light");
            setattempts(0);
            nextQuestion(true);
            setTimeout(() => {
                setMessage("Choose your answer");
                setStyle("text-center")
            }, 1000)

        } else {
            setMessage("Wrong");
            setattempts(attempts + 1);
            handleGameScore("wrong", attempts)
            setStyle("bg-danger text-center text-light")
            setTimeout(() => {
                setMessage("Choose your answer");
                setStyle("text-center")

            }, 1000)
        }
    };
    console.log("attempts", attempts);
    const choices = useMemo(() => randomize([...incorrect_answers, correct_answer]), [incorrect_answers, correct_answer]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    return (
        <>  <div class="container text-center">
            <h1 class="display-5 " >{cleanedQuestion}?</h1>
            <div class="d-flex justify-content-center align-items-center" >
                <form class="m-3" onSubmit={handleSubmit}>
                    {choices.map((choice, index) => (
                        <div class="form-check m-2" key={index}>
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