const router = require("express").Router();
const postController = require('../controllers/post.controller')

router.get("/", postController.findAll);
//get one
router.get("/:slug", postController.findOne);
//create
router.post("/", postController.create);
//update
router.put("/:id", postController.update);
//delete
router.delete("/:id", postController.deleteOne);
//delete all
router.delete("/", postController.deleteAll)

module.exports = router