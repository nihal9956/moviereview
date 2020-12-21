const express=require('express')
const { reviewController, deleteReviewController, allReviewController, updateReviewController } = require('../controllers/reviewsController')

const reviewRoute=express.Router()
const authMiddleware=require('../middleware/authMiddleware')

reviewRoute.post('/reviews',authMiddleware,reviewController)

reviewRoute.get('/reviews/all/:movieId',allReviewController)

reviewRoute.patch('/reviews/:id',authMiddleware,updateReviewController)

reviewRoute.delete('/reviews/:id',authMiddleware,deleteReviewController)


module.exports=reviewRoute

