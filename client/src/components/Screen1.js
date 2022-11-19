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
    const changepage3 = () => {
        navigate("/DeleteNode");
    }
    const changepage4 = () => {
        navigate("/Deleterelationship");
    }

    const [num, setNum] = useState(0);

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

    const [nodes, setNodes] = useState([]);

    const getdata = async () => {

        try {
            const res = await fetch("/test_api/neo4j_getnames", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                credentials: "include",
            });

            const data2 = await res.json();
            const stat = res.status;

            console.log(stat);

            setNodes(data2);
            // console.log(nodes);

            if (!(stat === 200)) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
        }


    }

    useEffect(() => {
        getdata();
    }, []);



    return (
        <div className='col-11 mx-auto bg-screen1 ht'>

            <div className='row ht'>
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">


                    <div>
                        <button className="col-12 btn btn-danger px-4 py-3 m-3" type="button" onClick={getnodes}>Get total number of nodes</button>
                        <h4 className='ps-3 text-warning'>Total number of nodes - {num.result}</h4>

                    </div>

                    <div className="row d-flex">
                        <div className='col-6'>
                            <button className="col-12 btn btn-danger px-4 py-3 m-3" type="button" onClick={changepage1}>Add a node</button>
                        </div>
                        <div className='col-6'>
                            <button className="col-12 btn btn-danger px-4 py-3 m-3" type="button" onClick={changepage2}>Create a relationship</button>
                        </div>
                    </div>
                    <div className="row d-flex">
                        <div className='col-6'>
                            <button className="col-12 btn btn-danger px-4 py-3 m-3" type="button" onClick={changepage3}>Delete a node</button>
                        </div>
                        <div className='col-6'>
                            <button className="col-12 btn btn-danger px-4 py-3 m-3" type="button" onClick={changepage4}>Delete a relationship</button>
                        </div>
                    </div>



                </div>
                <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                    <div className='col-6 mx-auto'>
                        {nodes.map((p) => (<a className="btn btn-success btn-lg m-3 rounded-pill p-4" tabindex="-1" role="button" aria-disabled="true">{p}</a>))}
                    </div>

                </div>

            </div>

        </div>

    )
}

export default Screen1
