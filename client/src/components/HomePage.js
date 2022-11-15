import React from 'react'
import "./HomePage.css"
import { useNavigate } from 'react-router-dom';

function HomePage() {

    const navigate = useNavigate();

    const changepage = () =>
    {
        navigate("/Screen1");
    }

    return (
        <>
            <div className='ht bg d-flex justify-content-center align-items-center'>
                <button className="btn btn-danger px-4 py-3" type="button" onClick={changepage}><h3>Get started!</h3></button>
                
            </div>
        </>
    )
}

export default HomePage