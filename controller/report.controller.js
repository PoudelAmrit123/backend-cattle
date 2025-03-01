
import { getDB } from "../db/db.js"
import PDFDocument from 'pdfkit'
import fs from 'fs'
import { timeStamp , allTime } from "../utils/time.behavior.js"


export const   getReport = async(req ,res)=>{
  const email  =  req.headers['authorization']?.split(' ')[1]

  const duration  =   req.query.dur


  
  
   
 
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
      length
    }

    
        const pdfPath  = await generatePDF(data)

        res.download(pdfPath , (err)=>{
            if(err){
                console.error("Error sending PDF:", err);
        res.status(500).json({ message: "Error generating PDF" });
            }
            fs.unlinkSync(pdfPath)

        })

 

    // res.json({"messgae" : "the api is working fine " ,data})

}

 

    const generatePDF = async (data) => {
        return new Promise((resolve, reject) => {
          const doc = new PDFDocument({ margin: 30 });
          const pdfPath = "./cow_report.pdf";
          const stream = fs.createWriteStream(pdfPath);
          
          doc.pipe(stream);
          
          doc.fontSize(18).text("Cow Activity Report", { align: "center" });
          doc.moveDown();
      
          // Total Behavior Summary
          doc.fontSize(14).text("Total Behavior Summary:", { underline: true });
          Object.entries(data.totalBehaviors).forEach(([behavior, count]) => {
            doc.fontSize(12).text(`${behavior}: ${count} cows`);
          });
          doc.moveDown();
      
         
          data.returnData.forEach((item) => {
            doc.fontSize(14).text(`Cow ID: ${item.cow_id}`, { bold: true });
            doc.fontSize(12).text(`Summary: ${item.summary}`);
            doc.fontSize(12).text(`Most Frequent Behavior: ${item.highestBehavior}`);
            
           
          
      
            doc.moveDown();
          });
      
          doc.end();
          
      
          stream.on("finish", () => resolve(pdfPath));
          stream.on("error", reject);
        });
      };
      

