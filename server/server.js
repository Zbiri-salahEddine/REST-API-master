const express = require('express');
const app = express();
const _PORT = 3001;
const cors = require('cors');
app.use(cors())
app.use(express.json())


// Connect TO DB    

const username = 'zbirisalah',
      password = 'rSfUdycgR6qhDSmy',
      database = 'mern-restApi'

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${username}:${password}@cluster1.vswnuio.mongodb.net/${database}?retryWrites=true&w=majority`)

//import user model

const UserModel = require('./models/User')

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



app.listen(_PORT, ()=>{
    console.log("attente des requetes au port 3001")
})