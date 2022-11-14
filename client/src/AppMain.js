import React from 'react'

import { Link } from "react-router-dom";

export default function AppMain() {
  return (
      <div className="appFields">
          <Link to="/pomodoro">
              <div class="appField">
                  <div class="appField_image">
                      <img src="/pomodoro.jpg" alt="pomodoro" />
                  </div>
                  <div class="appField_title title-white">
                      <p> Pomodoro Timer </p>
                  </div>
              </div>
          </Link>

          <Link to="/todolists">
              <div class="appField">
                  <div class="appField_image">
                      <img src="/to-do-list.jpg" alt="to-do-list" />
                  </div>
                  <div class="appField_title title-black">
                      <p> To-Do Lists </p>
                  </div>
              </div>
          </Link>
      </div>
  );
}
