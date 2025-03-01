import { getDB } from "../db/db.js"
import { timeStamp } from "../utils/time.behavior.js"
import fs from 'fs'
import PDFDocument from 'pdfkit'

export const getReportById = async(req, res)=>{
  const email  =  req.headers['authorization']?.split(' ')[1]

    const duration  = req.query.dur
    const cowId = req.params.id 
    const isDetails = req.query.details === "true"

     

    const collection   = getDB().collection('cowactivity')

    const dbData = await collection.find({
      user : email
    }).sort({ cow_id : 1  , timestamp : 1 }).toArray()
    
     
 

      


        const timeago  = new Date(new Date().getTime() - duration * 60*1000)

        const groupedData = dbData.reduce( (acc , item)=>{

           if(!acc[item.cow_id]){
            acc[item.cow_id] = []
           }
           acc[item.cow_id].push(item)
           return acc

        } ,{})

        const dataWithInTimeStamp = groupedData[cowId].filter((item) => {
           return item.timestamp >= timeago
        })


          const {summary , activityMap , highestBehavior} =  timeStamp(duration , groupedData[cowId])





    const data = {
        dataWithInTimeStamp ,
        summary,
        activityMap,
        highestBehavior
        
    }


   

     const pdfPath  = await generatePDF(data , cowId ,isDetails) 

     res.download(pdfPath , (err)=>{
        if(err){

            res.json({"error" :"Error while downloading pdf file"})

        }
        fs.unlinkSync(pdfPath)
        
     })
    
            // res.download(pdfPath , (err)=>{
            //     if(err){
            //         console.error("Error sending PDF:", err);
            // res.status(500).json({ message: "Error generating PDF" });
            //     }
            //     fs.unlinkSync(pdfPath)
    
            // })
    

}

const generatePDF = async (data, cowId, details) => {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 30 });
      const pdfPath = `./cow_report_${cowId}.pdf`;
      const stream = fs.createWriteStream(pdfPath);
  
      doc.pipe(stream);
  
     
      doc.fontSize(18).text("Cow Activity Report", { align: "center" });
      doc.moveDown();
  
     
      
  
      
      doc.fontSize(14).text("Total Behavior Summary:", { underline: true });
      Object.entries(data.activityMap).forEach(([behavior, count]) => {
        doc.fontSize(12).text(`${behavior}: ${count} times`);
      });
      doc.moveDown();
      doc.fontSize(14).text("Additional Summary:", { underline: true });

      
        // doc.fontSize(14).text(`Cow ID: ${item.cow_id}`, { bold: true });
        doc.fontSize(12).text(`Summary: ${data.summary}`);
        doc.fontSize(12).text(`Most Frequent Behavior: ${data.highestBehavior}`);
        doc.moveDown();
      
  
      
      if (details) {
        doc.fontSize(14).text("Cow Behavior Details:", { underline: true });
        data.dataWithInTimeStamp.forEach((item) => {
          doc.fontSize(12).text(`Cow ID: ${item.cow_id}`, { bold: true });
          doc.fontSize(12).text(`Timestamp: ${item.timestamp}`);
          doc.fontSize(12).text(`Behavior: ${item.behavior}`);
          doc.moveDown();
        });
      }
  
     
      
  
      doc.end();
  
      stream.on("finish", () => resolve(pdfPath));
      stream.on("error", reject);
    });
  };