import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { connectToDBAdmin } from "../db/admin.db.js";


 const userSchema  = new Schema({

    email : {
        type : String,
        required : true ,
        unique : true
    } ,
    password : {
        type : String ,
        required: true
    }

 })

 userSchema.pre('save'   , async function (next){
   

    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt)
    next()

 })


 userSchema.methods.comparePassword = async function (enteredPassword){
    return bcrypt.compare(enteredPassword , this.password)
 }

 export async function getUserModel (){
   const adminDB =   await connectToDBAdmin()
    return adminDB.model('User'  , userSchema)

 }
    

