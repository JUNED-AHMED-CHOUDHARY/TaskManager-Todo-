const Task = require("../model/Task");
const mongoose = require("mongoose");

exports.createTask = async(req, res) => {
    try {

        const {title, description} = req.body;

        const {id} = req.user;

        if (!id) {
            return res.status(400).json({
                success: false, 
                message: `something went wrong please sign in again`, 
            });
        }

        if (!title || !description) {
            return res.status(400).json({
                success: false, 
                message: `please enter both details`, 
            });
        }

        const task = await Task.create({
            title, 
            description, 
            createdBy: id, 
        });

        return res.status(200).json({
            success: true, 
            message: `new task created`, 
            task: task, 
        })
     
    } catch(err) {
        return res.status(500).json({
            success: false, 
            message: `error while creating task = ${err}`, 
        })
    }
}


exports.updateTask = async(req, res) => {
    try {
        
        const {title, description, archived, status} = req.body;

        const {id} = req.params;

        if (!id) {
            return res.status(400).json({
                success: false, 
                message: `something went wrong`, 
            });
        }

        const checkTaskExist = await Task.findById(id);

        if (!checkTaskExist) {
            return res.status(200).json({
                success: false, 
                message: `task no longer exists`, 
            });
        }

        if (!title || !description) {
            return res.status(400).json({
                success: false, 
                message: `all fields are required`, 
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(id, {title, description, archived, status}, {new: true});


        return res.status(200).json({
            success: true, 
            message: `task updated successfully`, 
            updatedTask, 
        })
     
    } catch(err) {
        return res.status(500).json({
            success: false, 
            message: `error while updating a task!! `, 
        })
    }
}

exports.deleteTask = async(req, res) => {
    try {
        
        const {id} = req.params;
        console.log("id while deleting -> ", id);
        const task = await Task.findById(new mongoose.Types.ObjectId(id));

        if (!task) {
            return res.status(404).json({
                success: false, 
                message: `task not found or its already deleted`, 
            });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true, 
            message: `task deleted successfully`, 
        })
     
    } catch(err) {
        return res.status(500).json({
            success: false, 
            message: `error while deleting a task = ${err.message}`, 
        });
    }
}

exports.getAllTasks = async(req, res) => {
    try {
        
        const id = req.user;

        const allTasksByUser = await Task.find({createdBy: new mongoose.Types.ObjectId(id)});

        if (!allTasksByUser) {
            return res.status(404).json({
                success: false, 
                message: `no tasks found`, 
            });
        }

        return res.status(200).json({
            success: true, 
            allTasks: allTasksByUser, 
        });  

    } catch(err) {
        return res.status(500).json({
            success: false, 
            message: `error while getting all task = ${err.message}`, 
        });
    }
}


exports.getSingleTask = async(req, res) => {
    try {
        
        const {id} = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                success: false, 
                message: `task not found`,
            });
        }

        res.status(200).json({
            success: true, 
            message: `task found`, 
            task: task, 
        });


    } catch(err) {
        return res.status(500).json({
            success: false, 
            message: `error while deleting a task = ${err.message}`, 
        });
    }
}