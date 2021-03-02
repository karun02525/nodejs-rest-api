import PostModel from '../model/Post.js'

export const getPosts = (req,res) =>{
    PostModel.find()
    .then(result=>{
        res.status(200).json({
         data:result
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
    res.send("hi post");
}