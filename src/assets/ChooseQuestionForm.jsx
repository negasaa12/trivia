import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getToken, apiCategories } from "../getToken";
import { trivia_categories } from "../TriviaCategories";
import { useNavigate } from "react-router-dom";
import "./ChooseQuestionForm.css";



const ChooseQuestionsForm = ({ handleQuestions }) => {



    const navigate = useNavigate();
    const initalState = {

        difficulty: "",
        category: ""
    };


    const [inputValue, setInputValue] = useState(initalState);

    const [categories, setCategories] = useState(trivia_categories);
    const [message, setMessage] = useState(null);

    const handleInputChange = (event) => {
        setInputValue({
            ...inputValue,
            [event.target.name]: event.target.value
        });
    };




    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!inputValue.category || !inputValue.difficulty) {

            setMessage("Please Pick A Category & Difficulty");

            setTimeout(() => {
                setMessage(null);
            }, 1000);

            return
        }



        try {
            const questions = await handleQuestions(inputValue, categories);

            if (questions) {
                console.log("QUESTIONS!!!!!!!!!!!!!!!!!! PARAMS", questions);
                navigate("/quiz");
            }

        } catch (error) {
            console.error("Error getting Categories", error);
        }
    };

    // console.log("CATEGORIES FROM FILE", trivia_categories);
    return (
        <>
            <div class="container">
                <div class="container text-center form">

                    <h1 class="display-3 mt-5 mb-5"> Trivia Game</h1>

                    <h2 class="display-6 m-2">Welcome to our thrilling trivia game! Here's how to play: </h2>

                    <div class="container-info">
                        <p> Aim to answer as many questions correctly as you can.</p>
                        <p> You have up to three tries per question to get the right answer.</p>
                        <p> If you miss three questions overall, the game will end.</p>


                    </div>


                </div>



                <div class="container text-center" >


                    <div class="container question" >
                        {message ?
                            <h3 className="question-form-error-h1">{message}</h3> :
                            <h3 className="question-form-h1">PICK YOUR TRIVIA</h3>
                        }
                        <form class="container form" onSubmit={handleSubmit}>
                            <label className="questions-form-label" htmlFor="category">Select Category:</label>
                            <select class="form-select" aria-label="Default select example" id="category" onChange={handleInputChange} name="category" value={inputValue.category}>
                                <option value="">Select</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>

                            <label htmlFor="difficulty" className="questions-form-label">Select Difficulty:</label>
                            <select class="form-select" aria-label="Default select example" id="difficulty" onChange={handleInputChange} name="difficulty" value={inputValue.difficulty}>
                                <option value="">Select</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>

                            <button class="question-button" type="submit">Ready</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChooseQuestionsForm