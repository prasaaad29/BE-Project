import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

function AddNode() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: ""
    });

    const goback = () =>
    {
        navigate("/Screen1")
    }

    const submithandler = async (e) => {
        const { name } = data;
        e.preventDefault();

        const res = await fetch("/test_api/neo4j_post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });

        const stat = res.status;

        console.log(stat);

        if (stat === 200) {
            window.alert("node added !!");
            navigate("/Screen1");
        }
    };

    return (
        <div className='d-flex align-item-center'>

            <div className='col-4 border border-warning border-2 mx-auto my-5'>

                <form method="POST" className='col-6 mx-auto m-3'>
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

                    <button type="submit" className="btn btn-success me-3 my-2" onClick={submithandler}>Add node</button>
                    <button type="button" className="btn btn-dark my-2" onClick={goback}>Go Back</button>
                </form>
            </div>


        </div>
    )
}

export default AddNode