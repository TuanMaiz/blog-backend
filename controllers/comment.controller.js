const db = require("../models");
const Comment = db.Comment;
const Post = db.Post
const Op = db.Sequelize.Op;

// Create comment
exports.create = async (req, res) => {
    const postId = req.params.postId //get post id where we gonna comment
    const {content} = req.body
    try {
        const post = await Post.findByPk(postId)
        if(post)
        {
            //create comment for post
            await Comment.create({
                content,
                postId
            })
        }
        else{
            res.status(404).json({message: "Post not found or maybe deleted"})
        }
    } catch (error) {
        console.error(error);
    }
};

// Retrieve all comment for 1 post
exports.findAll = async (req, res) => {
    const postId = req.params.postId //get post id where we gonna comment
    try {
        const post = await Post.findByPk(postId)
        if(post)
        {
           const allComments = await Comment.findAll({where: {postId}})
           res.status(200).json(allComments)
        }
        else{
            res.status(404).json({message: 'Post not found or maybe deleted'})
        }
        
    } catch (error) {
        
    }

};

// Find a single comment with an id (could be in notifications list like fb)
exports.findOne = async (req, res) => {
    const commentId = req.params.id
    const postId = req.params.postId
    try{
        const post = Post.findByPk(postId)
        if(post){
            const comment = await Comment.findByPk(commentId);
            if (comment) {
                res.status(200).json(comment);
              } else {
                res.status(404).json({ message: 'Comment not found' });
              }
        }
        else{
            res.status(404).json({ message: 'Post not found' });
        }
        
    } catch (error) {
        
    }
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const commentId = req.params.postId
  const {content} = req.body
  try {
    const comment = await Comment.findByPk(commentId)
    if(comment){
        comment.content = content
        await comment.save()
        res.status(200).json(comment)
    }
  } catch (error) {
    console.error(error);
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
    const commentId = req.params.postId
    try {
        const comment = await Comment.findByPk(commentId)
        if(comment){
            await comment.destroy()
            res.status(200).json({message: "Comment deleted"})
        }
      } catch (error) {
        console.error(error);
      }
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
