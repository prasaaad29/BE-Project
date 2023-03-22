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
    res.status(200).send({ result })  
    return { result };
})

router.post('/neo4j_post', async function (req, res, next) {
    //Passing in "name" parameter in body of POST request
    let  name  = req.body.name;
    let type = req.body.type;
    let status = req.body.status;
    
    let string = await neo4j_calls.create_user(type,name,status);
    res.status(200).send(string)
    return 700000;
    //res.status(200).send("test delete")
})

router.get('/neo4j_getnames',async function(req,res,next){

    let result = await neo4j_calls.get_names();
    
    console.log("result="+result);
    let alldata=[];
    result.map((p)=>{
        console.log(p._fields);
        alldata.push(p._fields); 
    })
    console.log("alldata="+alldata);
    alldata.map((i)=>{
        console.log(i[0]+" "+i[1].name+" "+i[1].status);
    })
    res.status(200).send(alldata);
    return alldata;

})

router.post('/neo4j_relation',async function(req,res,next){
    
    let {node1,node2,relationship} = req.body;
    let string = await neo4j_calls.create_relation(node1,node2,relationship);
    res.status(200).send("relation is created!!");
    return 700000;

})

router.get('/neo4j_getrelationships',async function(req,res,next){

    let result = await neo4j_calls.get_nodes_relationships();
    console.log(result);
    res.status(200).send(result);
    return result;

})

router.post('/neo4j_deletenode',async function(req,res,next){
    
    let name = req.body.name;
    console.log("name",name);
    let string = await neo4j_calls.delete_node(name);
    res.status(200).send("User deleted");
    return 700000;

})

router.post('/neo4j_deleterelationship',async function(req,res,next){
    
    let {node1,node2,relationship} = req.body;
    let string = await neo4j_calls.delete_relation(node1,node2,relationship);
    res.status(200).send("relation is Deleted!!");
    return 700000;


})

router.get('/neo4j_getimpacted/:id',async function(req,res,next){
    let  node1  = req.params.id;
    console.log("req.params.id="+req.params.id);
    let result = await neo4j_calls.get_impacted(node1);
    let alldata=[];
    result.map((p)=>{
        alldata.push(p._fields[0].name); 
    })
    console.log("alldata "+alldata);
    res.status(200).send(alldata);
    return alldata;
})

router.get('/neo4j_getdependent/:id',async function(req,res,next){
    let node1 = req.params.id;
    console.log("req.params.id="+req.params.id);
    let result = await neo4j_calls.get_dependent(node1);
    let alldata=[];
    result.map((p)=>{
        alldata.push(p._fields[0].name); 
    })
    console.log("alldata "+alldata);
    res.status(200).send(alldata);
    return alldata;
})


module.exports = router;
