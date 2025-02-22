
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://moonsanneupane:pass1@cluster0.prvftt5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const client = new MongoClient(uri);

let db ;

const connectToDB = async () => {
  try {
    await client.connect();
    console.log("Connecting to the database...");

    // List databases
    // const databases = await client.db().admin().listDatabases();
    // console.log("Databases:", databases.databases);

    // Select the database
    db = client.db("cowactivity"); // Ensure this is a string
    // console.log("The database is:", dbs.databaseName);

    // List collections in "cowactivity"
    // const collections = await dbs.listCollections().toArray();
    // const collection   = db.collection("cowactivity")
    // return collection
    // console.log("Collections in 'cowactivity':", collections.map(c => c.name));
    // const now = new Date();
    // const thirtyMinutesAgo = new Date(now.getTime() - 30*24 *24* 60 * 1000);
    // const data  = await collection.find({ cow_id : 1  , timestamp : {
    //     $gte :  thirtyMinutesAgo ,
    //     $lt  : now,
  
    // }}).toArray()
    // console.log('data '  , data)

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
