const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userSchema = require('./models/userSchema');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const path = require('path');
const cookieParser = require('cookie-parser');





const app = express();

 

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000', // Replace with your actual client port
  }));
app.use(express.json());
app.use(cookieParser());

//connect to mongo db data base

const db = process.env.MONGODB_URI;
mongoose.connect(db)
.then(()=>{

    app.listen(process.env.PORT, ()=>{

        console.log('connect to db & server is running on port 8000');
  })

}).catch((err) =>{

    console.log(err);

       
})



//API ROUTES


app.use('/auth' , userRoutes);
app.use('/listing' , listingRoutes);

app.use(express.static(path.join(__dirname , 'frontend/build')));

app.get('*' , (req , res)=>{

        res.sendFile(path.join(__dirname , 'frontend' , 'build' , 'index.html'))
})




//MIDDLE WARE


app.use((err , req , res , next)=>{

     const statusCode = err.statusCode || 500;
     const message = err.message || "Internal server error";

     return res.status(statusCode).json({
        success : false,

         message,
         statusCode,

     })

 
      
})



