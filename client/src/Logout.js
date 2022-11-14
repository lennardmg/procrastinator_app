import React from 'react'
import { useHistory } from "react-router-dom";

export default function Logout() {

    const history = useHistory();

    const logOut = () => {
        fetch("/logout", {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {

                if (res.success) {
                    history.push("/");
                    window.location.reload();
                }
            });
    };

  return (
      <button className="logOutField" onClick={logOut}>
          <img
              src="/logout.png"
              alt="logout button"
              style={{
                  height: "20px",
                  width: "20px",
                  backgroundColor: "none",
              }}
          ></img>
          &nbsp; Log-Out
      </button>
  );
}

