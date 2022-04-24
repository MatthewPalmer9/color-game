import React, { useState, useEffect } from 'react'

export default function Timer(props) {

    const [timer, setTimer] = useState(40);
    const [timerColor, setTimerColor] = useState("#37b24d");
    const { score, handleGameLoss } = props;

    useEffect(() => {
        setTimeout(() => {
            if(timer !== -1) {
                setTimer(timer - 1);
            }
            if(timer <= 15 && timer >= 5) {
                setTimerColor("#ffd43b");
            } else if(timer <= 5) {
                setTimerColor("#c92a2a");
            } 
            if(timer === 0 && score < 100) {
                console.log("Made it here...")
                handleGameLoss();
            }
        }, 1000);
        console.log(timer, score)
    }, [timer, score, handleGameLoss])

    return (
        <div className="timer">
            Timer: 
            <span style={{color: timerColor}}>{timer}</span>/s left.
        </div>
    )
}
