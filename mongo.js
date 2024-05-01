const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
    const database = client.db("WebDev");
    const users_collection = database.collection("users");
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: "Nachu" };
    // const writeQuery = await movies.insertOne({"name":"Nachu","pass":"1234qwerty"})
    const movie = await users_collection.findOne(query);
    console.log(movie);
    // console.log(writeQuery);
  
}

async function checkCredentails(username){
  const response = await client.db("WebDev").collection('users').findOne({ name: username });

  return response;
}

run().catch(console.dir);

module.exports = {
  checkCredentails
};