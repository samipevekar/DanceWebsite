const express=require("express")
const fs=require("fs")
// const bodyParser=require("body-parser")

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

// define mongoose
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });



// converting into model
const contact = mongoose.model('contact', contactSchema);


const app=express()
const port=90

app.use(express.static('static'))   //for serving static files
app.use(express.urlencoded())

app.set("view engine","pug")  //sets the view directory
app.set("views ","views")

app.get("/",(req,res)=>{
    res.render("home.pug")
})

app.get("/contact",(req,res)=>{
    res.render("contact.pug",)
})

app.post("/contact",(req,res)=>{
    var myData=new contact(req.body)
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    res.render("contact.pug")
})




//start the server
app.listen(port,(req,res)=>{
    console.log(`server is listening on port ${port}`)
})