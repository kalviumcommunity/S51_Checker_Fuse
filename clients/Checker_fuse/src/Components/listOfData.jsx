import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Data.css";

const ListOfData = () => {
    const nav = useNavigate();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    const okkk = (id) => {
        console.log(id)
        nav(`/update/${id}`)
    }
    
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
    
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/delete/${id}`);
            setData(data.filter((item) => item.ID !== id)); 
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = (index, color) => {
        const newData = [...data];
        switch(color){
            case "Engaged":
                newData[index].backgroundColor = "rgb(38, 224, 38)";
                break;
            case "Serenity":
                newData[index].backgroundColor = "gold";
                break;
            case "Dormant":
                newData[index].backgroundColor = "red";
                break;
            default:
                newData[index].backgroundColor = "";
        }
        setData(newData);
    };

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
                                    <button 
                                        onClick={() => handleClick(index, "Engaged")} 
                                        style={{ backgroundColor: item.backgroundColor === "rgb(38, 224, 38)" ? "rgb(38, 224, 38)" : "" }}
                                    >
                                        Engaged
                                    </button>
                                    <button 
                                        onClick={() => handleClick(index, "Serenity")} 
                                        style={{ backgroundColor: item.backgroundColor === "gold" ? "gold" : "" }}
                                    >
                                        Serenity
                                    </button>
                                    <button 
                                        onClick={() => handleClick(index, "Dormant")} 
                                        style={{ backgroundColor: item.backgroundColor === "red" ? "red" : "" }}
                                    >
                                        Dormant
                                    </button>
                                </div>
                            </div>
                            <div className="btnUpdateandDelete">
                                <button onClick={() => okkk(item.ID)} className="updt">Update</button>
                                <button className="dlt" onClick={() => handleDelete(item.ID)}>Delete</button>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default ListOfData;
