import { getDB } from "../db/db.js"
import { allTime, timeStamp } from "../utils/time.behavior.js"


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


       const dataWithInTimeStamp = groupedData[cowID]

    // const { summary , activityMap , highestBehavior , dataWithInTimeStamp} =    timeStamp(10300 , datatosend)
    const { summary , activityMap , highestBehavior } =  allTime(dataWithInTimeStamp)
    const data  = {
        summary,
        activityMap,
        dataWithInTimeStamp,
        highestBehavior
    }
    
    res.json({"message" : "The Cow Activity Details Of Id" , data})





}