const express = require("express")

const { getAllTodos, createTodo, getOneTodo, updateTodo, deleteTodo } = require("../controllers/todoController")

const router = express.Router()

router.route("/").get(getAllTodos).post(createTodo)
router.route("/:id").get(getOneTodo).patch(updateTodo).delete(deleteTodo)

module.exports = router