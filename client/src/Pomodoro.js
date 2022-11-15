import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

export default function Pomodoro() {


    //  useEffect(() => {
 
    //      var myVar = setInterval(function () {
    //          myTimer();
    //      }, 1000);

    //      let minuteLimit = 25;
    //      var secondlimit = 90;
     
    //      function myTimer() {
    //          if (secondlimit === 0) {
    //              myStopFunction();
    //          }
     
    //          document.getElementById("safeTimerDisplay").innerHTML =
    //              zeroPad(minuteLimit, 2) + zeroPad(secondlimit, 2);
    //          secondlimit = secondlimit - 1;
    //          minuteLimit = minuteLimit - 1;
    //      }
     
    //      function myStopFunction() {
    //          clearInterval(myVar);
    //      }
     
    //      function zeroPad(num, places) {
    //          var zero = places - num.toString().length + 1;
    //          return Array(+(zero > 0 && zero)).join("0") + num;
    //      }


    //  }, []);


  return (
      <>
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
          </div>



          <div id="safeTimer">
              <h2> Timer </h2>
              <h3>
                  <p id="safeTimerDisplay"></p>
              </h3>
          </div>
      </>
  );
}
