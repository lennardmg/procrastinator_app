import React from 'react'
import { Link } from "react-router-dom";
import BasicToDo from './BasicToDo';

export default function ToDoLists() {
  return (
    <div>
      <Link to="/" className="logOutField" 
      style={{ textDecoration: "none", top: "20px", left: "0px", position: "relative" }}>
              {" << "}
              Back{" "}
          </Link>

      <h2> To do Lists here </h2>
      <br></br>
      
      <h3> <BasicToDo /> </h3>
    </div>
  )
}
