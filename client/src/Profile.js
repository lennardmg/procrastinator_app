import React, { useState, useEffect } from 'react'
import Profilepic from './Profilepic';
import { parseISO, formatDistanceToNow } from "date-fns";

export default function Profile({ togglePopUpProfile, profileInfo }) {
    const [completedToDos, setCompletedToDos] = useState(0);

     useEffect(() => {

      fetch("/countCompletedToDos", {
          method: "GET",
          headers: {"content-type": "application/json"},
      })
          .then((res) => res.json())
          .then((data) => {

              if (data.success) {
                  setCompletedToDos(data.amount)
              } else {
                  console.log("something went wrong /countCompletedToDos");
              }
          });
     }, []);


    return (
        <>
            <div className="profileFlex">
                <div className="profileHeader">
                    <p
                        className="closeButton"
                        onClick={() => togglePopUpProfile()}
                    >
                        x
                    </p>
                    <div
                        style={{
                            height: "200px",
                            width: "200px",
                            margin: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            marginLeft: "75px",
                        }}
                    >
                        <Profilepic profileInfo={profileInfo} />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                width: "400px",
                            }}
                        >
                            <label
                                htmlFor="file"
                                style={{
                                    marginRight: "5px",
                                }}
                            >
                                {" "}
                                Upload a pic{" "}
                            </label>
                            <input type="file" name="file" accept="images/*" />
                        </div>
                    </div>
                </div>

                <div className="profileBody">
                    Hey{" "}
                    <strong>
                        {profileInfo.first_name} {profileInfo.last_name}
                    </strong>
                    , <br />
                    you joined us on{" "}
                    <i>
                        {" "}
                        {formatDistanceToNow(
                            parseISO(profileInfo.created_at)
                        )}{" "}
                        ago and
                    </i>{" "}
                    <br />
                    have since then completed <strong>
                        {completedToDos}
                    </strong>{" "}
                    tasks/To-Do's! <br />
                    <br />
                    {(completedToDos == 0 || completedToDos == null) && (
                        <span> Common, get some shit done! </span>
                    )}
                    {completedToDos > 0 && (
                        <span> Keep up the good work! </span>
                    )}
                </div>
            </div>
        </>
    );
}
