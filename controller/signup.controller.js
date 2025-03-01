        import  { getUserModel } from "../models/user.model.js"
        

  

   export const signupController = async(req, res)=>{

        const User = await  getUserModel()
            const {email , password} = req.body
            
            const isEmail  =  await User.findOne({email})
            if(isEmail){
              return  res.status(400).json({message : 'Email already registered'})
            }
            const user =  new User({ email  , password})

            await user.save()

            res.status(200).json({ message : "signup api working fine " , email})


}