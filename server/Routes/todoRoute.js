const express = require('express');
const router = express.Router();
const todoController = require('../Controllers/todoController');
const middleware = require("../Middleware/authorization")


router.post("/newtodo",middleware.authenticateToken,todoController.newTodo);
router.get("/alltodo",middleware.authenticateToken,todoController.getAllTodos);
router.put("/updatetodo/:id",middleware.authenticateToken, todoController.updateTodoById);
router.get("/alltodos/inprogress",middleware.authenticateToken, todoController.inprogress);
router.get("/alltodos/completed",middleware.authenticateToken, todoController.completed);
router.put("/deletetodo/:id",middleware.authenticateToken,todoController.deleteTodo);
router.put("/updatestatus/:id",middleware.authenticateToken,todoController.updateTodostatus);
module.exports = router;