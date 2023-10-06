
require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const Userroutes = require('../authentications/api/routes/user')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection failed:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', Userroutes);

// server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

















// // Connect to MongoDB


// const mongoURI = 'mongodb://localhost:27017/user';

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection failed:', err);
// });


// app.use(express.json())
// app.get('/posts', (req, res) => {
// res.json("hello")
// })



// app.post('/login', (req,res)=>{


//     const username = req.body.username
//     const user = {user:username}

//     const secretkey =jwt.sign(user, process.env.Secretkey)
//     res.json({secretkey:secretkey})



// })
// app.listen(3000)


