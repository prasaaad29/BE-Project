import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

function DeleteNode() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: ""
    });

    const goback = () => {
        navigate("/Screen1")
    }

    const submithandler = async (e) => {
        const { name } = data;
        e.preventDefault();

        const res = await fetch("/test_api/neo4j_deletenode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });

        const stat = res.status;

        console.log(stat);

        if (stat === 200) {
            window.alert("node Deleted !!");
            // navigate("/Screen1");
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
        <div className='d-flex align-item-center'>

            <div className='col-4 mx-auto my-5'>

                <form method="POST" className='col-9 mx-auto m-3 border border-warning border-2 p-5'>
                    <div className="mb-3">
                        <div className="mb-3">

                            <label for="name" className="form-label"><h3 className='text-danger'>Name - </h3></label>
                        </div>
                        <input
                            type="text"
                            id='name'
                            label="Name"
                            value={data.name}
                            onChange={(e) =>
                                setData({ ...data, name: e.target.value })
                            }
                        />
                    </div>

                    <button type="submit" className="btn btn-success me-3 my-2" onClick={submithandler}>Delete node</button>
                    <button type="button" className="btn btn-dark my-2" onClick={goback}>Go Back</button>
                </form>

                <div>

                    <div className='col-9 mx-auto m-3 p-5'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr className='text-danger fw-bold fs-4'>
                                    <th className='p-3'>Nodes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nodes.map((p, idx) => (<tr className="m-3 rounded-pill fs-5 p-4 text-light border-collapse" tabindex="-1" role="button" aria-disabled="true"><th className='p-2'>{idx + 1} - {p}</th></tr>))}
                            </tbody>

                        </table>

                    </div>

                </div>


            </div>




        </div>

    )
}

export default DeleteNode