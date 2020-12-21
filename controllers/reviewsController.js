const mongoose=require('mongoose')
const Review=mongoose.model('review')

exports.reviewController=(req,res)=>{                     //CREATE REVIEW

  const {review,rating,movieId}=req.body

  console.log(review,movieId)
  
  const userReview=new Review({

    review,
    rating,
    movieId,
    postedBy:req.user

  })

  userReview.save()
  .then(result=>{

    res.json({message:result})
  })
  
   
}
exports.allReviewController=(req,res)=>{                 //GET ALL REVIEWS POSTED BY USERS
    
       const {movieId}=req.params
    console.log(movieId)
    Review.find({movieId:movieId}).sort({_id:-1})
    .populate('postedBy')
    .then(result=>res.json({reviews:result}))


}

exports.updateReviewController=async (req,res)=>{             //EDIT THE POSTED REVIEW

    const {id}=req.params   //Review Id
    console.log(id)
    const {_id}=req.user._id    //user Id coming from middleware
    
    const {review}=req.body

    const options={new:true}

  
        Review.findById(id)              //finding and comparing the id of current user 
                                         //and user who posted this review
        .then(result=>{

        if(toString(result.postedBy)===toString(_id)){
            Review.findByIdAndUpdate(id,{review}, options,
                function (err, docs) { 
                if (err){ 
                console.log(err) 
                } 
                else{ 
                res.json({updated:docs})
                } 
                }); 
                
        }else{
            res.json({message:"You Must Be Logged In"})
        }
    })
    
   
    
}

exports.deleteReviewController=(req,res)=>{                //DELETE THE POSTED REVIEW

    const {id}=req.params   //review Id
const {_id}=req.user._id    //user Id coming from middleware


    Review.findById(id)
    .then(result=>{

        if( toString(_id) ===toString(result.postedBy)){

            Review.deleteOne({_id:id},(err)=>{

                if(err){
                    console.log(err)
                }
                
                res.json({"message":"Review Removed"})
            })

            
        }else{
            console.log("You Must Be LoggedIn")
        }
    })

    
}