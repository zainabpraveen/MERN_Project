const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
app.use(cookieParser())
dotenv.config({ path: './config.env' });
require('./db/conn');
app.use(express.json());

// const User = require('./model/userSchema');

// link the router files to make our rout easy
app.use(require('./router/auth'));

// 2nd step heroku
const PORT =process.env.PORT||5000;
// Middleware
// const middleware = (req, res, next)=>{
// console.log(`Hello my middleware`);
// next();
// }




// app.get('/about', (req,res)=>{
//   res.send(`<h1>Hello This About page</h1>`);
// });


  // app.get('/contact', (req,res)=>{
  //   // res.cookie("Test",'Zainab');
  //   res.send(`<h1>Hello This contact page</h1>`);
  // });

  // app.get('/signin', (req,res)=>{
  //   res.send(`<h1>Hello This Signin page</h1>`);
  // });
  // app.get('/signup', (req,res)=>{
  //   res.send(`<h1>Hello This Registration/Signup page</h1>`);
  // });
  
  // 3rd step heroku
  
  if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
  }
  
app.listen(PORT, ()=>{
    console.log(`Server is running at port no ${PORT}`);
})