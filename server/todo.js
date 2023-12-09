import express from "express";
import nodemon from "nodemon";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import cors from "cors";




const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
const MOONGO_URL = process.env.MOONGO_URL;


// const middleware = () => {
//     let userValid = true
//     if (userValid) {
//         next();
//     }else {
//         "Invalid user"
//     }
// }

//create Schema 

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const todoCollection = mongoose.model("Todo", todoSchema)

// delete todo
app.delete("/todo/:id", async (req, res) => {
    try {
        const data = await todoCollection.findByIdAndDelete(req.params.id)
        res.status(200).json( `Todo ${req.params.id} deleted`)
    } catch (err) {
        res.status(400).json( "Delete Todo failed",data)
        
    }

})


// update todo 

app.put ( "/todo/:id", async (req, res) => {
    try {
        const data = await todoCollection.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({message: "Updated todo failed"}, data)
    }
})


// get todo
app.get("/todo", async (req, res) => {
    try {
         const data = await todoCollection.find({})
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json({message: "Get todo failed"})
    }
})


//add todo
app.post("/todo", async (req, res) => {
    try {
        const data = {title: req.body.title, description : req.body.description}
        const entry = new todoCollection(data)
        await entry.save()
        res.status(200).json({message: "Added todo Successfully"})
    } catch (err) {
        console.log("Add to failed", err)
    }

})

//connect to DB
async function connect() {
    try {
        await mongoose.connect(MOONGO_URL)
        console.log("Mongo Connected Sucessfuly")
    } catch (err) {
        console.log("Connection failed to DB", err)
    }
}


//start the server
app.listen(PORT, () => {
    connect();
    console.log("Server Connected", PORT)
})