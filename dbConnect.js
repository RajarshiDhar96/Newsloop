const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://rohan:rohandhar@cluster0.fjsxhia.mongodb.net/newsloop',{useUnifiedTopology:true,useNewUrlParser:true})

const connection=mongoose.connection
connection.on('connected',()=>{
    console.log("MongoDb connection successful");
})


connection.on('error',()=>{
    console.log("MongoDb connection failed");
})

module.exports=mongoose

