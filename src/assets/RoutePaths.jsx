import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ChooseQuestionsForm from "./ChooseQuestionForm";
import { trivia_categories } from "../TriviaCategories";
import QuizGame from "../QuizGame";
import axios from "axios";
import GameOver from "./GameOver";
import { useNavigate } from "react-router-dom";
const RoutePaths = () => {


    const navigate = useNavigate();
    const [score, setscore] = useState(0);
    const initalState = {

        difficulty: "",
        category: ""
    };


    const [inputValue, setInputValue] = useState(initalState);
    const [questions, setQuestions] = useState("")
    const [categories, setCategories] = useState(trivia_categories);

    const handleQuestions = async (inputValues, categories) => {
        const { category, difficulty } = inputValues;
        const getId = categories.filter(c => c.name === category);

        if (getId.length === 0) {
            console.log("Category not found");
            return null;
        }

        try {
            const res = await axios.get(`https://opentdb.com/api.php`, {
                params: {
                    amount: 10,
                    category: getId[0].id,
                    difficulty: difficulty,
                    type: 'multiple'
                }
            });

            if (res.status !== 200) {
                throw new Error("NETWORK response was not ok");
            }

            setQuestions(res.data.results);
            return res.data.results;

        } catch (e) {
            console.log("Error, fetching questions", e);
            return null;
        }
    };

    const handleGameScore = (answer, attempts) => {
        console.log("answer ==>", answer, "attemps ====", attempts)


        if (answer === "correct" && attempts < 3) {
            setscore(score + 100);
        } else if (attempts == 2) {
            navigate('/over')
        }

    };


    return (
        <>


            <Routes>
                <Route exact path="/" element={<ChooseQuestionsForm handleQuestions={handleQuestions} />}></Route>
                <Route exact path="/quiz" element={<QuizGame questionsArr={questions} handleGameScore={handleGameScore} score={score} />}></Route>
                <Route exact path="/over" element={<GameOver score={score} />} ></Route>


            </Routes>

        </>
    )
}


export default RoutePaths