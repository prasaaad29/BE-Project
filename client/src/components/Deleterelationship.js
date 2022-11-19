import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

function Deleterelationship() {
  const navigate = useNavigate();

  const [data1, setData1] = useState({
    node1: "",
    node2: "",
    relationship: ""
  });

  const [nodes, setNodes] = useState([]);

  const goback = () => {
    navigate("/Screen1")
  }

  const submithandler = async (e) => {
    const { node1, node2, relationship } = data1;
    e.preventDefault();

    const res = await fetch("/test_api/neo4j_deleterelationship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ node1, node2, relationship }),
    });

    const stat = res.status;

    console.log(stat);

    if (stat === 200) {
      window.alert("Relation is Deleted !!");
      // navigate("/Screen1");
    }
  };

  const [relationship, setRelationship] = useState([]);

  const getdata = async () => {

    try {
      const res = await fetch("/test_api/neo4j_getrelationships", {
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

      console.log(data2);
      console.log(stat);

      setRelationship(data2);

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
    <div className='col-11 mx-auto'>


      {/* <div className='col-6 mx-auto my-3'>
        {nodes.map((p) => (<a className="btn btn-danger btn-lg mx-3" tabindex="-1" role="button" aria-disabled="true">{p}</a>))}
      </div> */}

      <div className="row">


        <div className='col-6 mx-auto my-5'>


          <form method="POST" className='col-8  border border-warning border-2 mx-auto m-3'>
            <div className='col-8 mx-auto my-5'>
              
            <div className="mb-3">
              <div className="mb-3">

                <label for="Node1" className="form-label"><h3 className='text-danger'>Node 1 - </h3></label>
              </div>
              <input
                type="text"
                id='Node1'
                label="Node1"
                value={data1.node1}
                onChange={(e) =>
                  setData1({ ...data1, node1: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <div className="mb-3">

                <label for="Node2" className="form-label"><h3 className='text-danger'>Node 2 - </h3></label>
              </div>
              <input
                type="text"
                id='Node2'
                label="Node2"
                value={data1.node2}
                onChange={(e) =>
                  setData1({ ...data1, node2: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <div className="mb-3">

                <label for="relationship" className="form-label"><h3 className='text-danger'>Relationship - </h3></label>
              </div>
              <input
                type="text"
                id='relationship'
                label="relationship"
                value={data1.relationship}
                onChange={(e) =>
                  setData1({ ...data1, relationship: e.target.value })
                }
              />
            </div>

            <button type="submit" className="btn btn-success m-3" onClick={submithandler}>Delete Relationship</button>
            <button type="button" className="btn btn-dark" onClick={goback}>Go Back</button>
            
            </div>
          </form>
        </div>

        <div className="col-6">

          <table className='table table-bordered border-warning text-light my-5'>
            <thead className='text-danger'>
              <tr>

              <th className='p-3'>Source</th>
              <th className='p-3'>Relationship</th>
              <th className='p-3'>Target</th>
              </tr>
            </thead>
            <tbody>
              {relationship.map((p,idx) => (<tr><td>{relationship[idx]._fields[0].properties.name}</td><td>{relationship[idx]._fields[2].type}</td><td>{relationship[idx]._fields[1].properties.name}</td></tr>))}
            </tbody>
          </table>

        </div>

      </div>


    </div>




  )
}

export default Deleterelationship