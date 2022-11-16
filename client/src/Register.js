import React from 'react'
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Register({ togglePopUpRegister }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const history = useHistory();

    const submitRegistrationForm = (e) => {
        e.preventDefault();

        if (firstname === undefined || firstname.trim() === "") {
            setMessage("*Please enter your first name");
        } else if (lastname === undefined || lastname.trim() === "") {
            setMessage("*Please enter your last name");
        } else if (
            email === undefined ||
            email.trim() === "" ||
            !email.includes("@") ||
            !email.includes(".")
        ) {
            setMessage("*Please enter a valid email adress");
        } else if (password === undefined || password.trim() === "") {
            setMessage("*Please enter your first name");
        } else {
            const newUser = {
                firstname,
                lastname,
                email,
                password,
            };

            fetch("/registration", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        history.push("/");
                        window.location.reload();
                    } else {
                        setMessage(data.message);
                    }
                });
        }
    };

    return (
        <div>
            <div className="inputFlex">
                <div className="inputHeader">
                    <p
                        className="closeButton"
                        onClick={() => togglePopUpRegister()}
                    >
                        x
                    </p>
                    <h2>Sign-Up here:</h2>
                </div>
                
                <form
                    action=""
                    className="inputForm"
                    onSubmit={submitRegistrationForm}
                >
                    <span style={{ color: "red" }}>{message}</span>

                        <label htmlFor="firstname" className="">
                            First Name
                        </label>
                        <input
                            type="text"
                            pattern="[\p{Letter}\-' ßñÄÖÜäüöæÆÅåØø]+"
                            name="firstname"
                            id="firstname"
                            required
                            onChange={(e) => setFirstname(e.target.value)}
                        />

                        <label htmlFor="lastname" className="">
                            Last Name
                        </label>
                        <input
                            type="text"
                            pattern="[\p{Letter}\-' ßñÄÖÜäüöæÆÅåØø]+"
                            name="lastname"
                            id="lastname"
                            required
                            onChange={(e) => setLastname(e.target.value)}
                        />


                        <label htmlFor="email" className="">
                            Email
                        </label>
                        <input
                            type="email"
                            pattern="[A-Za-z0-9._%+-ßöäü]+@[a-z0-9.-ßöäü]+\.[a-z]{2,}$"
                            name="email"
                            id="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <label htmlFor="password" className="">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
               

                    <div>
                        <button>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
