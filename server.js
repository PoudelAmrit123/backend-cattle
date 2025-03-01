import express from 'express'
import cowsRoutes from './routes/cows.route.js'
import cors from 'cors'
import cookieParser from "cookie-parser"; 

const app = express()

// const corsOption  = {
//     origin : ['http://localhost:8080'],
//     methods: ["GET", "POST", "PUT", "DELETE"], 
//     // credentials: true, 
// }

// app.use(cors(corsOption))
app.use(cors())
app.use(express.json())


app.use(cookieParser())  
app.use("/api" , cowsRoutes)

import { connectToDB } from './db/db.js'
// import { connectToDBAdmin } from './controller/login.controller.js';

// connectToDBAdmin().then( '8080' , ()=>{
//     console.log("Server started on port 8080")
//     console.log("Connected to the admin database...")
// })

connectToDB().then(
    app.listen("8080" , ()=>{
        console.log("Server started on port 8080")
    })
).catch( ()=>{
    console.error("Failed to start server")
})