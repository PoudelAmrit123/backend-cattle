import { getDB } from "../db/db.js"
import cookiesParser from 'cookie-parser'

export  const getAllCowsAllDetails  = async (req, res) => {

       const userName  =  req.cookies.user
       

    const collection   = getDB().collection("cowactivity")
    const data  =  await collection.find({
      // user : "test@gmail.com"
    }).toArray()

    console.log("the request is coming to this server in /api/cows routes ")
    res.status(200).json({message : "All Cows Data" , data} )   
 }



