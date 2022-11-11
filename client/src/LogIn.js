import React from 'react'
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useHistory();

  const submitLoginForm = (e) => {
        e.preventDefault();

        if (email === undefined || email.trim() === "" || !email.includes("@") || !email.includes(".")) {
            setMessage("*Please enter a valid email adress")
        } else if (password === undefined || password === "") {
            setMessage("*Please enter a valid password");
        } else {
            const checkUser = {
                email,
                password
            };

            fetch("/login", {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(checkUser),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data received from server: ", data);

                    if (data.success) {
                         history.push("/");
                         window.location.reload();
                    } else {
                        setMessage(data.message);
                    }
                });
        }
    }

  return (
      <div>
          <div className="inputFlex">
              <h2> Please Log-in </h2>
              <form action="" className="inputForm" onSubmit={submitLoginForm}>
                  <span style={{ color: "red" }}>{message}</span>

                  <div>
                      <label htmlFor="email" className="">
                          Email
                      </label>
                      <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>

                  <div>
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
                  </div>

                  <div>
                      <button>Log-In</button>
                  </div>
              </form>
          </div>
      </div>
  );
}
