const express = require("express");
const router = express.Router();

const {createTask, updateTask, deleteTask, getAllTasks, getSingleTask} = require("../controllers/Task");

const {auth} = require("../middlewares/auth");


router.post("/createtask", auth, createTask);
router.put("/updatetask/:id", auth, updateTask);
router.delete("/deletetask/:id", auth, deleteTask);

router.get("/getalltask/", auth, getAllTasks);
router.get("/getsingletask/:id", auth, getSingleTask);



module.exports = router;