import { getDB } from "../db/db.js"

export  const getAllCowsAllDetails  = async (req, res) => {

    const collection   = getDB().collection("cowactivity")
    const data  =  await collection.find({}).toArray()

    console.log("the request is coming to this server in /api/cows routes ")
    res.status(200).json({message : "All Cows Data" , data} )
  
    

 }



