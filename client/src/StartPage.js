import React from "react";
import LogIn from "./LogIn.js";
import { Link, Route } from "react-router-dom";
import Register from "./Register.js";

function StartPage() {
    return (
        <>
            <h1> Enough procrastination! It's time .. to get shit done! </h1>

            <div>
                <Link to="/login">
                    <div className="startPageField">Log in</div>
                </Link>
                
                <Link to="/register">
                    <div className="startPageField">Register</div>
                </Link>
            </div>

            <Route path="/login">
                <LogIn />
            </Route>

            <Route path="/register">
                <Register />
            </Route>
        </>
    );
}

export default StartPage;
