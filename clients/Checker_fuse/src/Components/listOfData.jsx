import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Data.css";

const ListOfData = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    // const [loading, setLoading] = useState(true);

   

    const fetchData = async () => {
        try {
            const headers = new Headers({"Access-Control-Allow-Origin":"*"});
            const response = await fetch("http://localhost:3000/get",{
                mode: 'no-cors',
                headers:headers,
                method: 'GET',
            });
            console.log(response)
            const res = await response.json()
            console.log("get", res)
            setData(res);
            // console.log(response)
            setError(null); // Reset error state if fetching is successful
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch the data");
        } 
        // finally{
        //     setLoading(false)
        // }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h3>Checker Fuse</h3>
            {/* {loading && <p></p> } */}
            {data.map((item, index) => (
                <div key={index}>
                    {/* <h3>{item.name}</h3>
                    <h3>{item.Age}</h3> */}
                    <h3>{item.DOB}</h3>
                </div>
            ))}
        </div>
    );
};

export default ListOfData;
