import mongoose from "mongoose";


let adminDB;

export async function connectToDBAdmin() {
    try {
        const uri = "mongodb+srv://admin:admin@cluster0.uwros.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        
        
        adminDB = mongoose.createConnection(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connected to the admin database...");

        return adminDB;
    } catch (error) {
        console.error("Error connecting to the admin database:", error);
        process.exit(1);
    }
}
