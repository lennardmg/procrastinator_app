import React, { useState } from "react";
import LogIn from "./LogIn.js";
import { Link, Route } from "react-router-dom";
import Register from "./Register.js";
import "./startPage.css";

function StartPage() {
    const [logInOpen, setLogInOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const togglePopUpLogIn = () => {
        setLogInOpen(!logInOpen);
    }

    const togglePopUpRegister = () => {
        setRegisterOpen(!registerOpen);
    };

    return (
        <div className="startPage">
            <div className="startPageFlex">
                <div className="leftSideStartPage"></div>
                <div className="rightSideStartPage">
                    <div className="startPageFields">
                        <div class="startPageField" onClick={togglePopUpLogIn}>
                            <div class="startPageField_image">
                                <img src="/login.jpg" alt="login" />
                            </div>
                            <div class="startPageField_title title-black">
                                <p> Log in </p>
                            </div>
                        </div>

                        <div
                            class="startPageField"
                            onClick={togglePopUpRegister}
                        >
                            <div class="startPageField_image">
                                <img src="/register.jpg" alt="register" />
                            </div>
                            <div class="startPageField_title title-black">
                                <p> Register </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {logInOpen && (
                <>
                    <div>
                        <LogIn togglePopUpLogIn={togglePopUpLogIn} />
                    </div>
                    <div className="greyBackground"></div>
                </>
            )}

            {registerOpen && (
                <>
                    <div>
                        <Register togglePopUpRegister={togglePopUpRegister} />
                    </div>
                    <div className="greyBackground"></div>
                </>
            )}

            <Route path="/login">
                <LogIn />
            </Route>

            <Route path="/register">
                <Register />
            </Route>

            <footer>
                <hr />
                &copy; Lennard learns Web-Development @SPICED{" "}
            </footer>
        </div>
    );
}

export default StartPage;
