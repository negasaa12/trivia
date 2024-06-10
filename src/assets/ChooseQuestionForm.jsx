import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getToken, apiCategories } from "../getToken";
import { trivia_categories } from "../TriviaCategories";
import { useNavigate } from "react-router-dom";
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

            <h1>PICK YOUR TRIVIA</h1>


            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Select Category:</label>
                <select id="category" onChange={handleInputChange} name="category" value={inputValue.category}>
                    <option value="">Select</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                    ))}
                </select>

                <label htmlFor="difficulty">Select Difficulty:</label>
                <select id="difficulty" onChange={handleInputChange} name="difficulty" value={inputValue.difficulty}>
                    <option value="">Select</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <button type="submit">Ready</button>
            </form>

            <p>Category: {inputValue.category}, Difficulty: {inputValue.difficulty}</p>


        </>
    )
}

export default ChooseQuestionsForm