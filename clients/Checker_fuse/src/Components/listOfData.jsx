import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Data.css";

const ListOfData = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const url = "https://checker-fuse.onrender.com/get"

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

    return (
        <> 
        <div className="alignment"> 
            <h1>Checker Fuse</h1>
            {error ? (
                <p>{error}</p>
            ) : (
                data.map((item, index) => (
                    <div key={index} className="border">
                        <div className="name">
                            <h3>{item.name}</h3>
                            <div className="identity">
                                <h5>{item.Location}</h5>
                                <h5>{item.Age}</h5>
                            </div>
                            <div className="button">
                                <button>Engaged</button>
                                <button>Serenity</button>
                                <button>Dormant</button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
        </>
    );
};

export default ListOfData;
