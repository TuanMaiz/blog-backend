const router = require("express").Router();
const userController = require('../controllers/user.controller')

//get all
router.get("/", userController.findAll);
//get one
router.get("/:id", userController.findOne);
//create
router.post("/signup", userController.create);
//login
router.post("/login", userController.login);

//update
router.put("/:id", userController.update);
//delete
router.delete("/:id", userController.deleteOne);

module.exports = router;
