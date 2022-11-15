import React, { useEffect, useState} from 'react'
import "./app.css";
import Logout from './Logout';
import AppMain from './AppMain';
import Pomodoro from './Pomodoro';
import ToDoLists from './ToDoLists';
import Profilepic from './Profilepic';
import { Route } from "react-router-dom";
import BasicToDoList from './BasicToDoList';

export default function App() {
    const [ profileInfo, setProfileInfo ] = useState({});

     useEffect(() => {
         fetch("/getUserInfo", {
             method: "GET",
             headers: {
                 "content-type": "application/json",
             },
         })
             .then((res) => res.json())
             .then((data) => {
                //  console.log("userInfo in UseEffect: ", data.userInfo);

                 if (data.success) {
                     setProfileInfo(data.userInfo[0]);
                     return;
                 } else {
                     console.log("something went wrong in getting the user info?!");
                 }
             });
     }, []);

  return (
      <div className="app">
          <header className="appHeader">
            <div className='leftAppHeader'>
              <Profilepic profileInfo={profileInfo} />
              <p> Hey {profileInfo.first_name} ... </p> 
            </div>
              <h1> GET SHIT DONE. </h1>
              <Logout />
          </header>
          <hr />

          <Route exact path="/">
              <AppMain />
          </Route>

          <Route exact path="/pomodoro">
              <Pomodoro />
          </Route>

          <Route exact path="/todolists">
              <ToDoLists />
          </Route>

          <Route path="/todolists/:basictodolist_name">
              <BasicToDoList />
          </Route>

          <footer>
              <hr />
              &copy; Lennard learns Web-Development @SPICED{" "}
          </footer>
      </div>
  );
}
