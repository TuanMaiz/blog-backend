const db = require("../models");
const Post = db.Post;
const User = db.User
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
   try{
    const post = await Post.create({...req.body})
    res.status(200).json("New post created")
   }
   catch(err){
    res.send(err)
   }
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    try {
      const page = 1
      const perPage = 10
      const offset = (page - 1) * 10
      const posts = await Post.findAll({
         include: {
          model: User,
          as: 'author',
          attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
         },
         limit: perPage,
         offset: offset,
         order: [['updatedAt', 'DESC']]
      })
      res.status(200).json(posts)
    } 
    catch (err) {
        res.send(err)
    }

};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    const slug = req.params.slug
    try {
        const post = await Post.findOne({
          where: {slug},
          include: {
            model: User,
            as: 'author',
            attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
           },
        })
        if(post)
            res.status(200).json(post)
        else
            res.status(404).json({message: 'Post not found'})
    } catch (error) {
        res.json(err)
    }

};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const postId = req.params.id
  const {title, content} = req.body

  try{
    const post = await Post.findByPk(postId)
    if(post){
        post.title = title
        post.content = content
        await post.save()
        res.status(200).json(post)
    }
    else{
        res.status(404).json({message: "Post not found"})
    }
  }
  catch(err){
    console.error(err);
  }
};

// Delete a Tutorial with the specified id in the request
exports.deleteOne = async (req, res) => {
  const postId = req.params.id
  try {
    const post = await Post.findByPk(postId)
    if(post){
        await post.destroy()
        res.status(200).json({message: "Delete post successfully"})
    }
    else{
        res.status(404).json({message: "Post not found"})
    }
    
  } catch (err) {
    console.error(err);
  }
};
//Delete All
exports.deleteAll = async (req, res) => {
  try {
        await Post.destroy()
        res.status(200).json({message: "Delete all post successfully"}) 
  } catch (err) {
    console.error(err);
  }
};


