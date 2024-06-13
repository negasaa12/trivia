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


    const handleInputChange = (event) => {
        setInputValue({
            ...inputValue,
            [event.target.name]: event.target.value
        });
    };




    const handleSubmit = async (event) => {
        event.preventDefault();

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

            <h1 className="question-form-h1">PICK YOUR TRIVIA</h1>

            <div class="d-flex justify-content-center align-items-center  " >
                <form className="questions-form" onSubmit={handleSubmit}>
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

                    <button class="btn btn-info m-2" type="submit">Ready</button>
                </form>
            </div>
            <p>Category: {inputValue.category}, Difficulty: {inputValue.difficulty}</p>


        </>
    )
}

export default ChooseQuestionsForm