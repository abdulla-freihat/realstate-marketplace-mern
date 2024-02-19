const userSchema = require('../models/userSchema.js')
const bcrypt = require('bcrypt');
const errorHandler = require('../utlis/error.js')
const jwt = require('jsonwebtoken');



 const signup = async (req , res , next)=>{

    const {username , email , password} = req.body;

      


            // Hash the password before saving it
               const salt = await bcrypt.genSalt(10);
               const hash = await bcrypt.hash(password , salt);  

            const newUser = new userSchema({username , email , password:hash}) ;



             

            try{
            await newUser.save();
            res.status(201).json("user created Successfully");

          }catch(err){

            next(err);


          }
           
            
            
}




const signin = async (req , res , next)=>{

  const { email  , password} = req.body;

   try{

       const validUser =await userSchema.findOne({email});

       if(!validUser){
         return next(errorHandler(404 , 'User Not Found'))
       } 
            
       

        const validPassword = await bcrypt.compare(password , validUser.password);
        if(!validPassword){

           return next(errorHandler(401 , 'Invalid email or  password'));
        }


        //create token

         const token = jwt.sign({id : validUser._id} , process.env.JWT_SECRET);
       
        

         res.cookie('access_token' , token , {httpOnly : true } ).status(200).json(validUser);
          
           
     
   }catch(err){

        next(err)
   }
        
}



const google = async (req , res , next)=>{
  const { email } = req.body;

try{

   const user = await  userSchema.findOne({email})

   if(user){
    const token = jwt.sign({id : user._id} , process.env.JWT_SECRET);
    res.cookie('access_token' , token , {httpOnly : true } ).status(200).json(user);

       
   }else{

        const generatedPassword = Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(generatedPassword, salt);  

        const newUser = new userSchema({username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
          , email : req.body.email , password: hash , avatar:req.body.photo});

          await newUser.save();

          const token = jwt.sign({id : newUser._id} , process.env.JWT_SECRET);
          res.cookie('access_token' , token , {httpOnly : true } ).status(200).json(newUser);

     
   }
}catch(err){

     next(err)
}
  
         
          
          
}



const updateUser = async(req , res , next)=>{

if(req.user.id !== req.params.id) return next(errorHandler(401 , 'You can only update your account!'))

try{

        if(req.body.password){

          const salt =  bcrypt.genSalt(10);
            req.body.password = bcrypt.hash(req.body.password , salt);
        }


        const updatedUser = await  userSchema.findByIdAndUpdate(req.params.id ,{

               $set : {

                        username : req.body.username,
                        email : req.body.email,
                        password : req.body.password,
                        avatar: req.body.avatar
               }

        } , {new : true} )

          const {password , ...rest} = updatedUser._doc;

           res.status(200).json(rest);
}catch(err){

       next(err)
}

   
     
}



const signout = async(req , res , next)=>{

  try{
     
       res.clearCookie('access_token');
       res.status(200).json('User has been logout');

      
  }catch(err){

     next(err)
  }

}



const getUser = async(req , res , next)=>{

  try{

    const user = await userSchema.findById(req.params.id);

    if(!user){

           return next(errorHandler(401 , 'User Not Found !'))
    }

       res.status(200).json(user);

       
   }catch(err){

       next(err)
  }
}


module.exports={

       signup,
       signin,
       google,
       updateUser,
       signout,
       getUser
}