const express=require('express')
const mongoose=require('mongoose')
//const PostMessage=require('./models/postMessages.js')
const cors=require('cors');
const myrouter=require('./routes/posts.js')
const app=express();
app.use(cors());
app.use(express.json());
const path=require('path')

//const multer=require('multer');


mongoose.connect('mongodb://localhost:27017/newapp',
err=>{
     if(!err){
          console.log('connected')
          
     }
     else{
          console.log('Not connected')
     }
})
//Once uponm atime there lived a stage in a jungel for the  first time
app.use('/post',myrouter);
app.use('/images', express.static(path.resolve(__dirname, 'Images')))

 
const port=process.env.PORT||5000

app.listen(port,()=>{

     console.log('server is running on port number 3001')
})
