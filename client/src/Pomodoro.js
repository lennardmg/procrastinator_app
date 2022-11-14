import React from 'react'
import { Link } from "react-router-dom";

export default function Pomodoro() {
  return (
      <div>
          <Link to="/" className="logOutField" style={{ textDecoration: "none", top: "20px", left: "0px", position: "relative" }}>
              {" << "}
              Back{" "}
          </Link>

          <h2>Here comes to Pomodoro timer</h2>
      </div>
  );
}
