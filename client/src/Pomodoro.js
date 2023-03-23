import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PomodoroBreak from "./PomodoroBreak";

import { createAudioBreak } from "./audiofiles";
const createAudio = createAudioBreak();

export default function Pomodoro() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [pause, setPause] = useState(true);
    const [newMinutes, setNewMinutes] = useState(0);
    const [newSeconds, setNewSeconds] = useState(0);
    const [breakTime, setbreakTime] = useState(false);

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
            setbreakTime(true);
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

    return (
        <>
            <div>
                <Link
                    to="/"
                    className="logOutField"
                    style={{
                        textDecoration: "none",
                        top: "20px",
                        left: "0px",
                        position: "relative",
                    }}
                >
                    {" << "}
                    Back{" "}
                </Link>
            </div>

            <div className="bigTimer">
                {breakTime === false && (
                    <div className="bigTimerComponent pomodoroBackground">
                        <h1> Time for your task: </h1>
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

                {breakTime === true && (
                    <div className="bigTimerComponent">
                        <h1> Time for your task: </h1>
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

                <br />
                <br />

                <PomodoroBreak
                    breakTime={breakTime}
                    setbreakTime={setbreakTime}
                />
            </div>
        </>
    );
}
