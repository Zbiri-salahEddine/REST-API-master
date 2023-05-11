const express = require('express');
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const _PORT = 3001;
const cors = require('cors');
app.use(cors())
app.use(express.json())

// Connect TO DB   

const username = 'zbirisalah',
      password = 'wOzi44k1UUIlpArH',
      database = 'mern-restApi'

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.xu04azr.mongodb.net/${database}?retryWrites=true&w=majority`)
const url = `mongodb+srv://${username}:${password}@cluster0.xu04azr.mongodb.net/${database}?retryWrites=true&w=majority`;



const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

//import user model

const UserModel = require('./models/User')


// POST route to insert data


// GET REQUEST
app.get("/users" , async ( req , res)=>{
    const users = await UserModel.find();
    res.json(users)
})

        
// CREATE USER (post)
app.post("/createUser" , async ( req , res)=>{
     const newUser = new UserModel(req.body);
     await newUser.save();

    res.json(req.body)
})

app.post("/data", async (req, res) => {
    try {
      const db = client.db(database);
      const data = db.collection("data");
      const value = req.body; 
      const result = await data.insertOne({ value }); 
      res.status(201).send(value); 
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  async function createDatabaseAndCollection() {
    try {
  
      await client.connect();
      const db = client.db(database); 
      // Check if the collection  already exists
      const collections = await db.listCollections().toArray();
      const collectionExists = collections.some(
        (collection) => collection.name === "data"
      );
      if (collectionExists) {
        console.log("Collection already exists");
        return;
      }
  
      // Create a collection named "data"
      await db.createCollection("data");
  
      console.log("Successfully created database and collection!");
    } catch (err) {
      console.error(err);
    } finally {
  
    }
  }
  
  createDatabaseAndCollection();
app.listen(_PORT, ()=>{
    console.log("attente des requetes au port 3001")
})

