
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://moonsanneupane:pass1@cluster0.prvftt5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const client = new MongoClient(uri);

let db ;

const connectToDB = async () => {
  try {
    await client.connect();
    console.log("Connecting to the database...");

   
    db = client.db("cowactivity"); // Ensure this is a string
   
   

    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};




const getDB =  ()=>{
    if(!db){
        console.log("No database connection available")
    } 
    return   db
}

export {connectToDB , getDB}
