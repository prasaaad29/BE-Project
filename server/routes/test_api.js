const express = require('express');
const router = express.Router();
const neo4j_calls = require('./../neo4j_calls/neo4j_api');

router.get('/', async function (req, res, next) {
    res.status(200).send("Root Response from :8008/test_api")
    return 700000;
})

router.get('/neo4j_get', async function (req, res, next) {
    let result = await neo4j_calls.get_num_nodes();
    console.log("RESULT IS", result)
    res.status(200).send({ result })    //Can't send just a Number; encapsulate with {} or convert to String.     
    return { result };
})

router.post('/neo4j_post', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let { name } = req.body;
    let string = await neo4j_calls.create_user(name);
    res.status(200).send("User named " + string + " created")
    return 700000;
    //res.status(200).send("test delete")
})

router.get('/neo4j_getnames',async function(req,res,next){

    let result = await neo4j_calls.get_names();
    // console.log("data");
    // console.log(result);
    let alldata=[];
    result.map((p)=>{
        // console.log(p._fields[0].name);
        alldata.push(p._fields[0].name); 
    })
    console.log(alldata);
    res.status(200).send(alldata);
    return alldata;

})

router.post('/neo4j_relation',async function(req,res,next){
    
    let {node1,node2,relationship} = req.body;
    let string = await neo4j_calls.create_relation(node1,node2,relationship);
    res.status(200).send("relation is created!!");
    return 700000;

})

module.exports = router;
