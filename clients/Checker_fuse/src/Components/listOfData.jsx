import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Data.css";

const ListOfData = () => {
    const nav = useNavigate()
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [color, setColor] = useState("");
    const url = "https://checker-fuse.onrender.com/get";
    const fetchData = async () => {
        try {
            console.log("Fetching data...");
            const response = await axios.get("http://localhost:3000/get");
            console.log("Response:", response);
            setData(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch the data");
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const okkk = (id) => {
        console.log(id)
        nav(`/update/${id}`)
    }
    
    const handleClick = (e, setColor) => {
        const backGroundColor = e.target.value;
        
        switch(backGroundColor){
            case "Engaged":
                setColor("rgb(38, 224, 38)")
                break
                case "Serenity":
                    setColor("gold")
                    break
                    case "Dormant":
                        setColor("red")
                        break
                        default:
                            setColor("")
                        }
                    }
                    return (
                        <> 
        <div className="alignment"> 
            <h1>Checker Fuse</h1>
            <div className="addBtn">
                <Link to={"/add"}><button>Add +</button></Link>
            </div>
            {error ? (
                <p>{error}</p>
            ) : (
                 data && data.map((item, index) => (
                    <div key={index} className="border">
                        <div className="name">
                            <h3>{item.name}</h3>
                            <div className="identity">
                                <h5>{item.Location}</h5>
                                <h5>{item.Age}</h5>
                            </div>
                            <div className="button">
                            <button value="Engaged" onClick={(e) => handleClick(e, setColor)} style={{backgroundColor: color === "rgb(38, 224, 38)" ? "rgb(38, 224, 38)" : ""}}>Engaged</button>
                            <button value="Serenity" onClick={(e) => handleClick(e, setColor)} style={{backgroundColor: color === "gold" ? "gold" : ""}}>Serenity</button>
                            <button value="Dormant" onClick={(e) => handleClick(e, setColor)} style={{backgroundColor: color === "red" ? "red" : ""}}>Dormant</button>
                            </div>
                    
                        </div>
                        <div className="btnUpdateandDelete">
                        <button onClick={() => okkk(item.ID)} className="updt">Update</button>
                                <button className="dlt">Delete</button>
                            </div>
                    </div>
                ))
            )}
        </div>
        </>
    );
};

export default ListOfData;