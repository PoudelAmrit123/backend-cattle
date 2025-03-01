import { getDB } from "../db/db.js"
import { timeStamp  , allTime} from "../utils/time.behavior.js"
// import { timeStamp } from "../utils/time.behavior.js"


export const getCowsActivityDetails = async(req , res)=>{

 
  const email  =  req.headers['authorization']?.split(' ')[1]
  let duration  = ""

  //  duration =  req.query.dur ?  parseInt(req.query.dur) : 360000
   duration =  req.query.dur

 const collection   =  getDB().collection('cowactivity')
  const dbData = await collection.find({
  user : email
  }).sort({ cow_id : 1  , timestamp : 1 }).toArray()
  const uniqueId = [... new Set( dbData.map(item => item.cow_id))]
  const length = uniqueId.length


  const groupedData = dbData.reduce( (acc , item)=>{
    if(! acc[item.cow_id]){
        acc[item.cow_id] = []
    }
    acc[item.cow_id].push(item)
    return acc

} , {})




   
         const returnData = []
    for (let index = 1; index <= length; index++) {
                
        //  if(duration){

           const {summary  , activityMap , highestBehavior} =  duration ?  timeStamp(duration , groupedData[index])  :allTime(groupedData[index])
        //  } else {
        //   const {summary , activityMap , highestBehavior} = allTime(groupedData[index])


        //  }


          const dataToInsert = {
            summary ,
            activityMap ,
            highestBehavior,
            cow_id : index
          }
          returnData.push(dataToInsert)
          
        
    }

  const totalBehaviors =   returnData.reduce( (acc , item)=> {

      const behaviors  = item.highestBehavior
      acc[behaviors] =( acc[behaviors] || 0) +1 
      return acc
    } , {})

    const data = {
      returnData , 
      totalBehaviors,
      length,
      duration
    }

    


  

    
   

    res.json({"message" :"Activity by timestamp  " , data})

 
}