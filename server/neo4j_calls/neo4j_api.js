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
        user = await session.run('MERGE (n:user {name: $id}) RETURN n', {
            id: name
        });
    }
    catch (err) {
        console.error(err);
        return user;
    }
    console.log(user.records[0].get(0));
    return user.records[0].get(0).properties.name;
}

exports.get_names = async function(){

    let session = driver.session();
    const data = await session.run('Match (n:user) return properties(n)', {
    });
    session.close();
    // console.log(data);

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
