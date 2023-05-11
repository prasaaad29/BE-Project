import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/Screen1.css"


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
    const changepage5 = () => {
        navigate("/GetImpacted");
    }
    const changepage6 = () => {
        navigate("/GetDependent");
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



        <div className='ht'>
            <div className='topnav border border-2 d-flex justify-content-between'>
                <h1 className='py-3 m-3'>GraphDB - Impact Analysis</h1>
                <h6 className='m-5'>Sarvatra eLab Technologies.</h6>
            </div>

            <div className='row'>
                <div className='sidebar col-3'>
                    <div className='heightofpage d-flex flex-column align-items-center justify-content-center'>
                        <button className="col-7 mx-auto btn btn-primary px-4 py-3 m-3" type="button" onClick={changepage1}>Add a node</button>
                        <button className="col-7 mx-auto btn btn-primary px-4 py-3 m-3" type="button" onClick={changepage2}>Create a relationship</button>
                        <button className="col-7 mx-auto btn btn-primary px-4 py-3 m-3" type="button" onClick={changepage3}>Delete a node</button>
                        <button className="col-7 mx-auto btn btn-primary px-4 py-3 m-3" type="button" onClick={changepage4}>Delete a relationship</button>
                        <button className="col-7 mx-auto btn btn-primary px-4 py-3 m-3" type="button" onClick={changepage5}>Get Impacted Nodes</button>
                        <button className="col-7 mx-auto btn btn-primary px-4 py-3 m-3" type="button" onClick={changepage6}>Get Dependent Nodes</button>
                    </div>

                </div>
                <div className='mainarea col-9 shadow-sm'>
                    <div className='col-11 mx-auto bg-screen1 heightofpage'>
                        <div className='row heheightofpagei'>
                            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                                <div className='col-12 mx-auto my-5'>
                                    {nodes.map((p) => (<a className="btn btn-success btn-lg m-3 rounded-pill p-4" tabindex="-1" role="button" aria-disabled="true">{p[2].name}</a>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default Screen1
