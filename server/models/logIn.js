const mongoose=require('mongoose');

const logInSchema=mongoose.Schema({

     email:{
          type:String,
          required:true
     },
     password:{
          type:String,
          required:true,  
     },
     friends:[{
          type:mongoose.Schema.Types.ObjectId,
          ref:'FollowFriend'
     }]
     
})
const LogInPost=mongoose.model('LogInPost',logInSchema);
module.exports=LogInPost;