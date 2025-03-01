import { getDB } from "../db/db.js";


export const getCowsDetails = async(req , res)=>{


      const collection   =  getDB().collection("cowactivity")
      const dbData =  await collection.find({ 
        user : "test@gmail.com"
      }).sort({cow_id : 1 , timestamp : 1}).toArray()
    
      const uniqueId = [... new Set( dbData.map(item => item.cow_id))]
      const totalLength = uniqueId.length || 0

                      const groupedData  = dbData.reduce( (acc  , item )=>{

                          
                            
                          if( !acc[item.cow_id]){
                              acc[item.cow_id] = []
                          }
                          acc[item.cow_id].push(item)
                          return acc 



                      } , {})

                   //TODO: Need to implement the groupedData where we have to reduce the items and make that single items and by default that will be timestamp of last hour and if there is something unusal then the timestamp will not be formatted it will stay where it is  before   
                                           
          
               
          


      const data  = {
        cows  : groupedData,
        length  : totalLength 
      }

    return res.json({message: "The data with that ids only "  ,data })

}