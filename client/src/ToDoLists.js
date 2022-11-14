import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";


export default function ToDoLists() {
  const [ toDoLists, setToDoLists ] = useState([]);
  const [ toDoListName, setToDoListName ] = useState("");
  const [ message, setMessage] = useState("");


  useEffect(() => {
      fetch("/getToDoLists", {
          method: "GET",
          headers: {
              "content-type": "application/json",
          },
      })
          .then((res) => res.json())
          .then((data) => {

            // console.log("data in UseEffect: ", data);

            if (data.success) {

              setToDoLists(data.toDoLists);
              return;
            } else {
              console.log("no To-Do lists to show");
            }

          });
  }, []);


  const createToDoList = (e) => {
    e.preventDefault();

    if (toDoListName === undefined || toDoListName.trim() === "") {
        setMessage("*Please enter a name for your To-Do list");
    } else {

        fetch("/createBasicToDoList", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                basictodolist_name: toDoListName
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    console.log("To-Do list successfully created");
                    setToDoLists([data.newToDoList, ...toDoLists]);
                }
            });
    }
    
  }

  return (
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
          <br />
          <br />
          <br />

          <h2 className="toDoListCreationFieldHeader">
              Create a To-Do list:
              <div className="toDoListCreationField">
                  <form onSubmit={createToDoList} className="inputForm">
                      <input
                          type="text"
                          name="todolistname"
                          placeholder="Give your list a name"
                          required
                          onChange={(e) => setToDoListName(e.target.value)}
                      />

                      <div className="checkBoxFlex">
                          <p> Basic To-Do list </p>
                          <input type="checkbox" name="checkBox1"></input>
                      </div>
                      <div className="checkBoxFlex">
                          <p> Advanced To-Do list </p>
                          <div></div>
                          <input type="checkbox" name="checkBox2"></input>
                      </div>

                      <button> Create List </button>
                      <span style={{ color: "red" }}>{message}</span>
                  </form>
              </div>
          </h2>

          <br />
          <br />

          <h2> Your To-Do lists: </h2>

          {toDoLists.length === 0 && (
              <>
                  <br />
                  <h4 style={{ fontStyle: "italic" }}>
                      {" "}
                      You do not have any To-Do lists yet. Create one and get
                      productive!{" "}
                  </h4>
                  <br />
              </>
          )}

          <div className="appFields">
              {toDoLists.map((toDoList) => (
                  <div class="appField" key={toDoList.id}>
                      <div class="appField_image">
                          <img src="/basictodolist.jpg" alt="pomodoro" />
                      </div>
                      <div class="appField_title title-black">
                          <p> {toDoList.basictodolist_name} </p>
                      </div>
                  </div>
              ))}
          </div>

          <br />
      </div>
  );
}
