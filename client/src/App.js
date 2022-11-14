import React from 'react'
import "./app.css";
import Logout from './Logout';
import AppMain from './AppMain';
import Pomodoro from './Pomodoro';
import ToDoLists from './ToDoLists';
import { Link, Route } from "react-router-dom";

export default function App() {
  return (
      <div className="app">
          <header className="appHeader">
              <div>Profile</div>
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
      </div>
  );
}
