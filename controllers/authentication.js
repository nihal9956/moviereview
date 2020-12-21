
const mongoose=require('mongoose')
const User=mongoose.model('user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const dotenv=require('dotenv')



dotenv.config();

exports.signup=(req,res)=>{                 //signup controller

    const {name,email,password}=req.body  //destructuring 
    
    if(!email||!name||!password){           //checking if all fields are filled

        return res.json({message:"Please fill all the details"})
    }

    User.findOne({email:email})
    .then(savedUser=>{
        if(savedUser){


            return res.json({message:"User Already Exist"})
        }

        bcrypt.hash(password,12,(err,hashedPassword)=>{

            if(err){
                console.log(err)
            }else{

                const user=new User({

                    email,
                    name,
                    password:hashedPassword
                })
                user.save((err)=>{

                    if(err){
                        console.log(err)
                    }else{
                        return res.json({message:"Signed Up Successfully"})
                    }
                })
            }
        })
       

       
        
    })


         
}


exports.login=(req,res)=>{              //login controller

    const {email,password}=req.body
        // console.log(email,password)
        if(!email||!password){
          return  res.json({error:"Please enter email or password"})
        }

        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
               return res.json({error:"Invalid email or password"})
            }
            bcrypt.compare(password,savedUser.password)   //comapring encrypted password with entered password
            .then(isMathching=>{
                if(isMathching){
                 
                     const token=jwt.sign({_id:savedUser._id},process.env.jwt__secret)  //if password is matching give user a access token
                
                     const {_id,name,email}=savedUser
                     res.json({token,_id,name,email})

                }else{
                    return res.json({error:"Invalid email or password"})
                }
            })
            .catch(error=>{
                console.log(error)
            })
        })
    


}                                                                  