import React from "react";
import Data from "./Data.json"
import "./CSS1.css"  

export default function CheckerList() {
    return (
        <>
            <div className="div1">
                <h2>
                    <b>
                        Group Of Peers
                    </b>
                </h2>
            </div>
            <div className="div2">
                {Data.map((items, index) => (
                    <div key={index} className="firstandlast">
                        <p><b style={{ color: "black" }}>First Name: </b>{items.first_name}</p>
                        <p><b style={{ color: "black" }}>Last Name: </b>{items.last_name}</p>
                        <p><b style={{ color: "black" }}>Age:</b> {items.Age}</p>
                        <p><b style={{ color: "black" }}>DOB:</b> {items.DOB}</p>
                        <p><b style={{ color: "black" }}>ID no:</b>{items.ID}</p>
                        <p><b style={{ color: "black" }}>Location:</b>{items.Location}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
