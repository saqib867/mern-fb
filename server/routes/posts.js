const express=require('express');
const multer=require('multer')
const router=express.Router()
const path=require('path')
const PostMessage=require('../models/postMessages')
const LogInPost=require('../models/logIn');
const FollowFriend=require('../models/friend')
const { findById } = require('../models/postMessages');
const { response } = require('express');

const storage=multer.diskStorage ({

    destination:(req,file,cb)=>{
         cb(null,'./Images')
         console.log(file)
    },
    filename:(req,file,cb)=>{
         
         cb(null, Date.now()+ path.extname(file.originalname))
    }
})
const Upload=multer({storage:storage});

router.post('/signup',(req,res)=>{
     const email=req.body.email;
     const password=req.body.password;
     LogInPost.findOne({email})
     .then(getEmail=>{
          console.log(getEmail)
          if(!getEmail){
               
               const logIn= new LogInPost({email,password}); 
               
                logIn.save()
               .then((user)=>{
                    
                    res.json(user.email)
                    
               })
               .catch(err=>res.status(400).json('error:'+err));
          }
          else{
               res.json('0')
          }
     })
     .catch(err=>res.status(400).json('error:'+err));
 
})

router.post('/signin',(req,res)=>{
       const email=req.body.email
       const password=req.body.password;
       
       LogInPost.findOne({email})
      .then(response=>{
           console.log(response.password)
           if(response.password===password){
               res.json(response.email)
           }
           else{
                res.json('0');
           }
      })
      .catch(err=>res.json('0'))
})

router.get('/posts',(req,res)=>{
     //try{
        PostMessage.find()
        .then(getPosts=>res.json(getPosts))
        .catch(err=>res.json('Errors:'+err));
     
});
router.post('/myposts',Upload.single('photo'),(req,res)=>{
     console.log('req.body',req.file.filename)
    const creater=req.body.creater;
    const title=req.body.title;
    const message=req.body.message;
    const tag=req.body.tag;
    const image='http://localhost:5000/images/'+req.file.filename;
    const getUser=req.body.getUser
    
   // const image=''
    
    const newPost=new PostMessage({creater,title,message,tag,image,getUser});
    newPost.save()
    .then(()=>res.json(newPost))
    .catch(err=>res.status(400).json('error:'+err));
   
});

router.patch('/postupdated/:id',(req,res)=>{

             const _id=req.params.id;
             PostMessage.findById(req.params.id)
             .then(postUpdate=>{
                  postUpdate.title=req.body.updateTitle;
                  postUpdate.creater=req.body.updateCreater;
                  postUpdate.message=req.body.updateMessage;
                  postUpdate.tag=req.body.updateTag;
                  postUpdate.save()
                  .then((updated)=>res.json(updated))
             })
  })
router.delete('/delete/:id',(req,res)=>{
                             
           PostMessage.findByIdAndDelete(req.params.id)
           .then(postDelete=>res.json('Post deleted'))
           .catch(err=>res.json('Error: ',err))
})

router.patch('/like/:id',(req,res)=>{
     PostMessage.findById(req.params.id)
     .then(likeUpdate=>{
          
          likeUpdate.likeCount=likeUpdate.likeCount+1;
          likeUpdate.save()
          .then((updated)=>res.json(updated))
     })
})
router.patch('/friend/:following',(req,res)=>{

       const following=req.params.following;
       const follower=req.body.follower
       const id=req.body.userId
       FollowFriend.findOne({follower,following})
       .then(response=>{
            console.log('response',response)
           if(response===null){
               const follow_unfollow=new FollowFriend({id,follower,following})
               follow_unfollow.save()
              .then((resp)=>{
                   res.json(resp)
                   
                   //console.log('resp',resp)
               })
              .catch(err=>res.status(400).json('error:'+err));
            }
           /* else if(response!==null){
                 
           FollowFriend.findOneAndDelete({follower})
           .then(postDelete=>{
                console.log('post delete',postDelete)
                res.json('1')
                
               })
           //.catch(err=>res.json('1'))
                 
            }*/
            
       })
       .catch(err=>console.log(err))
})

router.get('/getFollowing',(req,res)=>{

             FollowFriend.find()
            .then(getFriend=>res.send(getFriend))
            .catch(err=>res.json('Errors:'+err));
})

router.patch('/unfollow/:id',(req,res)=>{
             const _id=req.params.id
     FollowFriend.findOneAndDelete({_id})
     .then(postDelete=>{
          console.log('post delete',postDelete)
          res.json('unfollowed')
          
         })
     .catch(err=>res.json('0'))
})




module.exports=router;