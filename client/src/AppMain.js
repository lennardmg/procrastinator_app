import React from 'react'

import { Link } from "react-router-dom";

export default function AppMain() {


  return (
      <div className="appFields">
          <Link to="/pomodoro">
              <div className="appField">
                  <div className="appField_image">
                      <img src="/pomodoro.jpg" alt="pomodoro" />
                  </div>
                  <div className="appField_title title-white">
                      <p> Pomodoro Timer </p>
                  </div>
              </div>
          </Link>

          <Link to="/todolists">
              <div className="appField">
                  <div className="appField_image">
                      <img src="/to-do-list.jpg" alt="to-do-list" />
                  </div>
                  <div className="appField_title title-black">
                      <p> To-Do Lists </p>
                  </div>
              </div>
          </Link>
      </div>
  );
}
