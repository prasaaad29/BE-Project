import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function DeleteNode() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const navigate = useNavigate();

    const [data, setData] = useState({
        id: ""
    });

    const goback = () => {
        navigate("/Screen1")
    }

    const submithandler = async (e) => {
        const { id } = data;

        e.preventDefault();
        console.log("id=" + id);
        const res = await fetch("/test_api/neo4j_deletenode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
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

        <div className='ht'>
            <div className='topnav border border-2 d-flex justify-content-between'>
                <h1 className='py-3 m-3'>Delete Node</h1>
                <h6 className='m-5'>Sarvatra eLab Technologies.</h6>
            </div>

            <div className='row'>
                <div className='sidebar col-3 bg-primary'>
                    <div className='heightofpage d-flex flex-column align-items-center justify-content-center'>
                        <form method="POST" className='col-9 mx-auto m-3 p-5'>

                            <div className="mb-3">
                                {/* <input
                                    type="text"
                                    id='name'
                                    label="Name"
                                    className="p-2 rounded fs-5 my-3"
                                    placeholder='Node'
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({ ...data, name: e.target.value })
                                    }
                                /> */}
                                <select className='px-5 py-3 rounded fs-5 my-3' name="name" id="name" onChange={(e) =>
                                    setData({ ...data, id: e.target.value })}>
                                    {nodes.map((p) => (<option value={p[0].low}>{p[2].name}</option>))}
                                </select>

                            </div>
                            <div className="mb-3 col-12">
                                <button type="submit" className="col-12 p-3 fs-5 btn btn-success my-2" onClick={submithandler}>Delete node</button>
                            </div>
                            <div className="mb-3 col-12">
                                <button type="button" className="col-12 p-3 fs-5 btn btn-dark my-2" onClick={goback}>Go Back</button>
                            </div>
                        </form>

                    </div>

                </div>

                <div className='mainarea col-9 shadow-sm'>
                    <div className='mainarea col-9 shadow-sm'>
                        <div className='col-11 mx-auto bg-screen1 heightofpage'>
                            <div className='row heheightofpagei'>
                                <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                                    <div className='col-12 mx-auto my-5'>
                                        {nodes.map((p) => (<a className="btn btn-success btn-lg m-3 rounded-pill p-4" tabindex="-1" role="button" aria-disabled="true">{p[2].name}</a>))}
                                    </div>
                                </div>

                                <Button onClick={handleOpen}>Open modal</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Text in a modal
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                        </Typography>
                                    </Box>
                                </Modal>






                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default DeleteNode