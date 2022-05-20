const mongoose=require('mongoose');

const followFriend=mongoose.Schema({

     id:{
          type:String,
          required:true
     },
     follower:{
          type:String,
          required:true
     },
     following:{
          type:String,
          required:true
     }
})

const FollowFriend=mongoose.model('FollowFriend',followFriend);
module.exports=FollowFriend;