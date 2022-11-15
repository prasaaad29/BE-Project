import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./HomePage.css"


function Screen1() {


    const navigate = useNavigate();
    const changepage1 = () => {
        navigate("/AddNode");
    }
    const changepage2 = () => {
        navigate("/AddRelationship");
    }

    const [num,setNum] = useState(0);

    const getnodes = async (e) => {

        e.preventDefault();
        try {
            const res = await fetch("/test_api/neo4j_get", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                credentials: "include",
            });

            const data = await res.json();
            const stat = res.status;

            console.log(stat);
            console.log("data", data);
            setNum(data);

            if (!(stat === 200)) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className='col-4 mx-auto my-5 bg-screen1'>

            <div>
                <button className="col-10 btn btn-danger px-4 py-3 m-3" type="button" onClick={getnodes}>Get total number of nodes</button>
                <h4 className='ps-3 text-warning'>Total number of nodes - {num.result}</h4>
                
            </div>
            
            <div>
                <button className="col-10 btn btn-danger px-4 py-3 m-3" type="button" onClick={changepage1}>Add a node</button>
            </div>
            <div>
                <button className="col-10 btn btn-danger px-4 py-3 m-3" type="button" onClick={changepage2}>Create a relationship</button>
            </div>

        </div>

    )
}

export default Screen1
