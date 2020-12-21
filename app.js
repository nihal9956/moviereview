const express= require('express')
// const axios=require('axios')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const path=require('path')


dotenv.config();

require('./models/userModel')
require('./models/reviewModel')

const app=express();
app.use(cors({
    allowedOrigins: [
        'http://localhost:4000'
    ]
}));
app.use(express.json())
app.use(require('./routes/user'))  
app.use(require('./routes/review'))

//serve static assets if in production

if(process.env.NODE_ENV==='production'){
    //set static folder

    app.use(express.static('frontend/build'))

    app.get('*',(req,res)=>{

      res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}

// Database connfigration
mongoose.connect(process.env.MONGO__URI,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify:false,
      useCreateIndex:true
    
    }) //connecting with mongoDB
mongoose.connection.on('connected',()=>{                 //if connected with mongoDB send success message
    console.log("Conected to DB succesfully")
})

mongoose.connection.on('error',(err)=>{                 //if not connected with mongoDB send fail message
    console.log("connection Failed",err)
})


// app.get('/',(req,res)=>{

//     axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=8dd98042&t=joker')
//     .then(result=>{
//         console.log(result.data.Title)
//     })
// })


app.listen(process.env.PORT||4000,()=>{

    console.log("server started at 4000")
})