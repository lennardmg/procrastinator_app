import React from 'react'

export default function Profilepic({ profileInfo }) {
    return (
        <img
            src={profileInfo.profile_pic_url}
            alt=""
            style={{
                height: "65px",
                width: "65px",
                borderRadius: "50%",
                border: "1px solid black",
                margin: "3px",
                marginLeft: "10px",
            }}
        ></img>
    );
}
