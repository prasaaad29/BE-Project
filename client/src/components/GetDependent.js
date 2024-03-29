import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/Screen1.css"

function GetDependent() {
  
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: ""
    });

    const goback = () => {
        navigate("/Screen1")
    }

    const submithandler = async (e) => {
        const {name}=data;
        e.preventDefault();
        try {
            const res = await fetch(`/test_api/neo4j_getdependent/${name}`, {
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

    // useEffect(() => {
    //     getdata();
    // }, []);



    return (


        <div className='ht'>
            <div className='topnav border border-2 d-flex justify-content-between'>
                <h1 className='py-3 m-3'>Get Dependent Nodes</h1>
                <h6 className='m-5'>Sarvatra eLab Technologies.</h6>
            </div>

            <div className='row'>
                <div className='sidebar col-3 bg-primary'>
                    <div className='heightofpage d-flex flex-column align-items-center justify-content-center'>

                        <form method="GET" className='col-9 mx-auto m-3 p-5'>
                            
                            <div className="mb-3">
                                <input
                                    type="text"
                                    id='name'
                                    label="Name"
                                    className="p-2 rounded fs-4 my-3"
                                    placeholder='Name'
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({ ...data, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="mb-3 col-12">
                                <button type="submit" className="col-12 p-3 btn btn-success my-2 fs-5" onClick={submithandler}>Get Dependent nodes</button>
                            </div>
                            <div className="mb-3 col-12">
                                <button type="button" className="col-12 p-3 btn btn-dark my-2 fs-5" onClick={goback}>Go Back</button>
                            </div>
                        </form>

                    </div>

                </div>
                <div className='mainarea col-9 shadow-sm'>
                    <div className='col-11 mx-auto bg-screen1 heightofpage'>
                        <div className='row heheightofpagei'>
                            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                                <div className='col-12 mx-auto my-5'>
                                    {nodes.map((p) => (<a className="btn btn-success btn-lg m-3 rounded-pill p-4" tabindex="-1" role="button" aria-disabled="true">{p}</a>))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default GetDependent