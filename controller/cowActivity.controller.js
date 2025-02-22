import { getDB } from "../db/db.js"
import { timeStamp } from "../utils/time.behavior.js"


export const getCowActivityDetailsById  =async (req , res)=>{

    const collection =  getDB().collection('cowactivity')
          const dbData = await collection.find({}).sort({ cow_id : 1 , timestamp : 1 }).toArray()
    

    const cowID =  req.params.id

       const groupedData = dbData.reduce( (acc , item)=>{
                    if(! acc[item.cow_id]){
                        acc[item.cow_id] = []
                    }
                    acc[item.cow_id].push(item)
                    return acc

       } , {})


       const data = groupedData[cowID]

    const { summary , activityMap} =    timeStamp(300 , data)
    const summarizedData  = {
        summary,
        activityMap
    }
    
    res.json({"message" : "The Cow Activity Details Of Id" , summarizedData})





}