const mongoose=require('mongoose')

const postSchema=mongoose.Schema({

     title:{
          type:String,
          required:true
     }, 
     message: {
          type:String,
          required:true
     },
     creater:{
           type:String,
           required:true
     },
     tag: {
          type:String,
          required:true
     },
     image: {
          type: String,
          required: true
       },
     likeCount:{
          type:Number,
          default:0
     },
     createdAt:{
          type: Date,
          default: new Date()
     },
     getUser:{
          type:String,
          required:true
     }
});
const PostMessage=mongoose.model('PostMessage',postSchema);

module.exports= PostMessage;