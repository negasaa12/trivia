import React from "react";

import { useNavigate } from "react-router-dom";


const GameOver = ({ score = 200 }) => {



    return (
        <div class="container">
            <div class="row min-vh-100">
                <div class="col-12 d-flex justify-content-center align-items-center">
                    <div class="border p-5 rounded text-center bg-info" >
                        <h1 class="display-1">Game Over</h1>
                        <p class="display-2">Score:</p>
                        <p class="display-2">300</p>
                    </div>
                </div>
                <button>add</button>
            </div>
        </div>
    )

}

export default GameOver