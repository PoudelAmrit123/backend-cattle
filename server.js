import express from 'express'
import cowsRoutes from './routes/cows.route.js'
import cors from 'cors'

const app = express()


app.use(express.json())
app.use(cors())
app.use("/api" , cowsRoutes)

import { connectToDB } from './db/db.js'

connectToDB().then(
    app.listen("8080" , ()=>{
        console.log("Server started on port 8080")
    })
).catch( ()=>{
    console.error("Failed to start server")
})