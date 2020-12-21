const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types

const reviewSchema=new mongoose.Schema({


    review:{
        type:String
       
    },

    rating:{
        type:Number
      
    },
    
    movieId:{
        type:String
    },
    postedBy:{
        type:ObjectId,
        ref:"user"
    }

})

mongoose.model("review",reviewSchema)


