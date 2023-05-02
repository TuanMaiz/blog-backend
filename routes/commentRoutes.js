const router = require('express').Router()
const CommentController = require('../controllers/comment.controller')


router.get("/", CommentController.findAll);
//get one
router.get("/:id", CommentController.findOne);
//create
router.post("/", CommentController.create);
//update
router.put("/:id", CommentController.update);
//delete
router.delete("/:id", CommentController.deleteOne);

module.exports = router