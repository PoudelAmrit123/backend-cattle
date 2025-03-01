// import mongoose from "mongoose"
// import User from "../models/user.model.js";

import { getUserModel } from "../models/user.model.js"


//   export async function connectToDBAdmin (){

//     try {

//         const uri = 'mongodb+srv://admin:admin@cluster0.uwros.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

//        const adminDB=    mongoose.createConnection(uri , {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,

//            })
        
//         await mongoose.connect(uri , {useNewUrlParser: true, useUnifiedTopology: true})
//     } catch (error) {
//          process.exit(1);        
//     }
      
//      console.log("Connected to the database...")
// }


export const loginController = async(req ,res)=>{
    // connectToDBAdmin()
    const User = await getUserModel()

   


    try {
        const {email , password }  = req.body

         const user  =  await   User.findOne({email })

        if(!user){
            return res.status(401).json({message : "Invalid email or password"})
        }

    

         const isMatch = await user.comparePassword(password)

        if(!isMatch){
            return res.status(400).json({message : "Invalid email or password"})
        }        
    
        res.status(200).json({ message :"Login Successfull" , email})
    
        
    } catch (error) {

        res.status(400).json({message : "Error while loggin"})
        
    }

   
}