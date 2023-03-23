import React, { useEffect, useState } from "react";

import { createAudioWork } from "./audiofiles";
const createAudio = createAudioWork();

export default function PomodoroBreak({ breakTime, setbreakTime }) {
    const [minutes, setMinutes] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [pause, setPause] = useState(true);
    const [newMinutes, setNewMinutes] = useState(0);
    const [newSeconds, setNewSeconds] = useState(0);

    // otherwise the number below 0 would only have one digit:
    function addZeros(n) {
        return (n < 10 ? "0" : "") + n;
    }

    const decreaseNum = () => {
        setSeconds((previous) => previous - 1);
    };

    const resetTimer = (minutes, seconds) => {
        setMinutes(minutes);
        setSeconds(seconds);
    };

    const toggleTimer = () => {
        setPause((prev) => !prev);
    };

    useEffect(() => {
        if (pause) {
            return;
        }

        if (minutes <= 0 && seconds <= 0) {
            toggleTimer();
            setbreakTime(false);
            createAudio.play();
            return;
        }

        if (seconds <= 0) {
            setSeconds(59);
            setMinutes((prev) => prev - 1);
        }

        const timer = seconds > 0 && setInterval(() => decreaseNum(), 1000);

        return () => clearInterval(timer);
    }, [seconds, pause, minutes]);

    useEffect(() => {
        if (breakTime) {
            toggleTimer();
            return;
        }
    }, [breakTime]);

    return (
        <>
            <div className="bigTimer">
                {breakTime === true && (
                    <div className="bigTimerComponent pomodoroBackground">
                        <h1> Time for a break: </h1>
                        <br />
                        <div className="timer">
                            {addZeros(minutes)}:{addZeros(seconds)}
                        </div>

                        <button onClick={toggleTimer}>
                            {pause ? "▶ Start" : "|| Pause"}
                        </button>

                        <div>
                            <input
                                className="setNetTimeField"
                                name="number"
                                type="number"
                                min="0"
                                max="60"
                                placeholder={addZeros(newMinutes)}
                                onChange={(e) => setNewMinutes(e.target.value)}
                            ></input>
                            <span>:</span>
                            <input
                                className="setNetTimeField"
                                name="number"
                                type="number"
                                min="0"
                                max="59"
                                placeholder={addZeros(newSeconds)}
                                onChange={(e) => setNewSeconds(e.target.value)}
                            ></input>
                        </div>
                        <button
                            onClick={() => resetTimer(newMinutes, newSeconds)}
                        >
                            {" "}
                            ⟳ Reset{" "}
                        </button>
                    </div>
                )}

                {breakTime === false && (
                    <div className="bigTimerComponent">
                        <h1> Time for a break: </h1>
                        <br />
                        <div className="timer">
                            {addZeros(minutes)}:{addZeros(seconds)}
                        </div>

                        <button onClick={toggleTimer}>
                            {pause ? "▶ Start" : "|| Pause"}
                        </button>

                        <div>
                            <input
                                className="setNetTimeField"
                                name="number"
                                type="number"
                                min="0"
                                max="60"
                                placeholder={addZeros(newMinutes)}
                                onChange={(e) => setNewMinutes(e.target.value)}
                            ></input>
                            <span>:</span>
                            <input
                                className="setNetTimeField"
                                name="number"
                                type="number"
                                min="0"
                                max="59"
                                placeholder={addZeros(newSeconds)}
                                onChange={(e) => setNewSeconds(e.target.value)}
                            ></input>
                        </div>
                        <button
                            onClick={() => resetTimer(newMinutes, newSeconds)}
                        >
                            {" "}
                            ⟳ Reset{" "}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
