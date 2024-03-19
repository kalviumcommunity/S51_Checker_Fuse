import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Data.css";
import Cookies from 'js-cookie'; // Add import statement for Cookies

const ListOfData = () => {
    const nav = useNavigate();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState("ALL");

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    }

    const filteredLocation = selectedLocation !== "ALL" ? data.filter((locate) => locate.Location === selectedLocation) : data;

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
            console.error("Error deleting item:", error);
            setError("Failed to delete the item");
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
    
    const removeCookies = () => {
        Cookies.remove('username');
        Cookies.remove('password');
        nav('/');
    };

    return (
        <> 
            <div className="alignment"> 
                <h1>Checker Fuse</h1>
                <div className="btns2">
                    <div className="addBtn">
                        <Link to={"/add"}><button>Add +</button></Link>
                    </div>
                    <div className="select">        
                        <select value={selectedLocation} onChange={handleLocationChange} className="optionBar">
                            <option value= "ALL">
                                All location
                            </option>
                            {Array.from(new Set(data.map((locate) => locate.Location))).map((Location) => (
                                <option key={Location} value={Location} >{Location}</option>
                            ))}
                        </select>
                    </div>
                    <div className="logout">
                        <button onClick={removeCookies}>Log Out</button>
                    </div>
                </div>
                {error ? (
                    <p>{error}</p>
                ) : (
                    filteredLocation.map((item, index) => (
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
                                <button onClick={() => nav(`/update/${item.ID}`)} className="updt">Update</button>
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
