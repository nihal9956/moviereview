const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=mongoose.model('user')


const dotenv=require('dotenv')


dotenv.config();

module.exports=(req,res,next)=>{

    const {authorization}=req.headers

    if( ! authorization){

        return res.json({message:"You must be logged in"})

    }

    const bearer=authorization.split(' ')

    const token=bearer[1]
    
    jwt.verify(token,process.env.jwt__secret,(err,payload)=>{
        const {_id}=payload

        User.findById(_id).select('-password')
        .then(result=>{

            req.user=result
            next();
        })
    })

  
}