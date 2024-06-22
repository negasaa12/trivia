import React from "react";




const GameOver = ({ score }) => {



    return (
        <div class="container text-center">
            <h2> Game Over</h2>
            <p> {score}</p>
        </div>
    )

}

export default GameOver