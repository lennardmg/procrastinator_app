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
    
          &nbsp;Log-Out
      </button>
  );
}

