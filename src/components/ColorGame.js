import React, { useState, useEffect } from 'react';
import Timer from './Timer';

export default function ColorGame() {

    // STATE
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(40);
    const [scoreColor, setScoreColor] = useState("");
    const [currentHexColor, setCurrentHexColor] = useState("");
    const [currentWord, setCurrentWord] = useState("");
    const [placement, setPlacement] = useState(); // This will help determine the placement (left or right) of the correct answer VS the wrong answer
    const [gameOn, setGameOn] = useState(false);
    const [winState, setWinState] = useState(false);
    const [loseState, setLoseState] = useState(false);

    // COLOR ARRAYS
    const colorWordArr = ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "PURPLE"];
    const colorArr = ["#c92a2a", "#e8590c", "#ffd43b", "#37b24d", "#1971c2","#862e9c"];
    const selectedColor = colorArr[Math.floor(Math.random() * colorArr.length)];
    const filteredWord = colorWordArr.filter((word) => word !== colorWordArr[colorArr.indexOf(currentHexColor)]);
    
    const handleWinGame = () => {
        setGameOn(false);
        setWinState(true);
    }

    useEffect(() => {
        setCurrentWord(filteredWord[Math.floor(Math.random() * filteredWord.length)]);

        if(score === 100) {
            handleWinGame();
        } else if(score === 0) {
            setScoreColor("aliceblue");
        } else if(score > 0) {
            setScoreColor("#37b24d")
        } else {
            setScoreColor("#c92a2a")
        }

        if(gameOn) {
            setCurrentHexColor(selectedColor)
        }
    }, [score, gameOn, selectedColor, currentHexColor, filteredWord]);

    // GAME START
    const handleGameStart = () => {
        setPlacement(Math.floor(Math.random() * 2 + 1));
        setGameOn(true);
    }

    // PLAY AGAIN
    const handlePlayAgain = () => {
        setScore(0);
        setWinState(false);
        setGameOn(true);
    }

    // LOSE HANDLER
    const handleGameLoss = () => {
        setGameOn(false);
        setLoseState(true);
        setWinState(false);
    }

    // USER EVENT
    const handleUserPick = (e) => {
        e.preventDefault();
        setPlacement(Math.floor(Math.random() * 2 + 1));
        const choice = document.getElementById(e.target.name).innerText;
        const hexColorOfChoice = colorArr[colorWordArr.indexOf(choice)];

        // SCORE SETTER BASED ON CHOICE
        if(hexColorOfChoice === currentHexColor) {
            setScore(score === 1 ? score + 9 : score + 10)
        } else {
            setScore(score === 1 ? score - 11 : score - 10);
        };
    }

    return (
        <div className="container">
            <div style={{color: scoreColor}}className="score">
                {score}
            </div>
            
            <div className="board">
                {gameOn ? (
                    <>
                    <div className="current-game">
                        {(placement === 1 ? (
                            <>
                                <span id="right" style={{color: "white"}}>{currentWord}</span>
                                <span style={{color: currentHexColor}}>{currentWord}</span>
                                <span id="left" style={{color: "white"}}>{colorWordArr[colorArr.indexOf(currentHexColor)]}</span> 
                            </>
                        ) : (
                            <>
                                <span id="right" style={{color: "white"}}>{colorWordArr[colorArr.indexOf(currentHexColor)]}</span> 
                                <span style={{color: currentHexColor}}>{currentWord}</span>
                                <span id="left" style={{color: "white"}}>{currentWord}</span>
                            </>
                        ))} 
                    </div>
                    <div className="choice-btns">
                        <button onClick={handleUserPick} name="right">&larr;</button>
                        <button onClick={handleUserPick} name="left">&rarr;</button>
                    </div>
                    <Timer score={score} handleGameLoss={handleGameLoss} />
                    </>
                ) : (
                    winState ? (
                        <>
                            <div className="winner-container">
                                <h1>Congratulations!</h1>
                                <p>You won!</p>
                                <button onClick={handlePlayAgain}>Play again?</button>
                            </div>
                        </>
                    ) : (
                        loseState ? (
                            <>
                                <div className="loser-container">
                                    <h1>Oh no!</h1>
                                    <p>You lost...</p>
                                    <button onClick={handlePlayAgain}>Play again?</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="instructions">
                                    <p>
                                        You have 20 seconds in total. Correct answers are +10, Incorrect answers are -10. 
                                        The goal is to achieve a score of 100. You must choose the correct COLOR, not the 
                                        matching WORD! When the game begins, use the LEFT (&larr;) and RIGHT (&rarr;) arrow 
                                        buttons on screen to make your choices.
                                    </p>
                                    <button onClick={handleGameStart}>START</button>
                                </div>
                            </>
                        )
                    )
                )}
            </div>
        </div>
    )
}
