let neo4j = require('neo4j-driver');
let { creds } = require("./../config/credentials");
let driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));

exports.get_num_nodes = async function () {
    let session = driver.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {
    });
    session.close();
    console.log("RESULT", (!num_nodes ? 0 : num_nodes.records.length));
    return (!num_nodes ? 0 : num_nodes.records.length);

};


exports.create_user = async function (name) {
    let session = driver.session();
    let user = "No User Was Created";
    try {
        user = await session.run(`MERGE (n:user {name: "${name}"}) RETURN n`);
    }
    catch (err) {
        console.error(err);
        return user;
    }
    session.close();
    console.log(user.records[0].get(0));
    return user.records[0].get(0).properties.name;
}

exports.get_names = async function(){

    let session = driver.session();
    const data = await session.run('Match (n) return properties(n)', {
    });
    session.close();
    console.log(data);
    return data.records;
}

exports.create_relation = async function(node1,node2,relationship)
{
    let session = driver.session();
    const data = await session.run(`match (a:user),(b:user) where a.name="${node1}" AND b.name="${node2}" CREATE (a)-[: ${relationship}]->(b) RETURN a,b`)
    session.close();
    console.log(data);
    return data;


}


exports.get_nodes_relationships = async function () {
    let session = driver.session();
    const num_nodes = await session.run('MATCH (n)-[r]->(m) return n,m,r', {
    });
    session.close();
    return (num_nodes.records)

};


exports.delete_node = async function (name) {
    let session = driver.session();
    let user;
    try {
        console.log("inside");
        user = await session.run(`MATCH (n:user {name:"${name}" }) DELETE n`)
    }
    catch (err) {
        console.log("inside catch");
        console.error(err);
        return user;
    }
    session.close();
    console.log("user",user.records);
    return (user.records)

};


exports.delete_relation = async function(node1,node2,relationship)
{

    let session = driver.session();
    const data = await session.run(`MATCH (a:user{name:"${node1}"})-[r:${relationship}]->(b:user{name:"${node2}"}) DELETE r `)
    session.close();
    console.log(data);
    return data;


}

exports.get_impacted = async function(node1){
    let session = driver.session();
    console.log(node1);
    const data = await session.run(`MATCH p=(n)-[*]->(f:user) WHERE f.name="${node1}" RETURN properties(n)`, {
    });
    console.log(data.records);
    session.close();
    return data.records;
}

exports.get_dependent = async function(node1){
    let session = driver.session();
    console.log(node1);
    const data = await session.run(`MATCH p=(f:user)-[*]->(n) WHERE f.name="${node1}" RETURN properties(n)`, {
    });
    session.close();
    return data.records;
}

