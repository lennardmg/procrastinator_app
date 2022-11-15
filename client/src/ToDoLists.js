import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function ToDoLists() {
  const [ toDoLists, setToDoLists ] = useState([]);
  const [ toDoListName, setToDoListName ] = useState("");
  const [ message, setMessage] = useState("");

  const history = useHistory();
  const toDoListNameRef = useRef();

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

              setToDoLists(data.uniqueToDoLists);
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
                    toDoListNameRef.current.value = null;
                }
            });
    }
  }

  const openToDoList = (basictodolist_name) => {
      history.push(`/todolists/${basictodolist_name}`);
  };

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
                          ref={toDoListNameRef}
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

          <h2 style={{
                  textShadow: "5px 5px 8px #010610",
            }}>
              {" "}
              Your To-Do lists:{" "}
          </h2>

          {toDoLists.length === 0 && (
              <>
                  <br />
                  <h4
                      style={{
                          fontStyle: "italic",
                          textShadow: "5px 5px 8px #010610",
                      }}
                  >
                      {" "}
                      You do not have any To-Do lists yet. Create one and get
                      productive!{" "}
                  </h4>
                  <br />
              </>
          )}

          <div className="appFields">
              {toDoLists.map((toDoList) => (
                  <div
                      className="appField"
                      key={toDoList.id}
                      onClick={() => openToDoList(toDoList.basictodolist_name)}
                  >
                      <div className="appField_image">
                          <img src="/basictodolist.jpg" alt="pomodoro" />
                      </div>
                      <div className="appField_title title-black">
                          <p> {toDoList.basictodolist_name} </p>
                      </div>
                  </div>
              ))}
          </div>

          <br />
      </div>
  );
}
