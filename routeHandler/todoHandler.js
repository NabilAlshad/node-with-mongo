const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../Schema/todoSchema");
const userSchema = require("../Schema/userSchema");
const User = new mongoose.model("User", userSchema);
const checkLogin = require("../Middleware/CheckUser");
const Todo = new mongoose.model("Todo", todoSchema); //this returns a class // this takes two parameter first takes the model name and the second parmater takes the schema that you want to modeled

//get active status route

router.get("/active", async (req, res) => {
  const todo = new Todo();
  try {
    const data = await todo.findActive();
    res.status(200).json({ message: "successfull" });
  } catch (err) {
    res.status(500).json({ error: "there is an error" });
  }
});

//router that calls static methods with
router.get("/read", async (req, res) => {
  try {
    const data = await Todo.findjs();
    res.status(200).json({
      data,
      message: "successfull",
    });
  } catch (err) {
    res.status(500).json({ error: "there is something error occurred" });
  }
});
router.get("/", checkLogin, (req, res) => {
  Todo.find()
    .populate("user", "name username-_id")
    .select({
      _v: 0,
      _id: 0,
      date: 0,
    })

    .exec((err, data) => {
      if (err) {
        res.status(500).json({ error: "error occurrred" });
      } else {
        console.log(data);
        result: data, res.status(200).json({ message: "success" });
        // console.log(result);
      }
    });
  // console.log(data);
});

//find by query helpers
router.get("/withquery", async (req, res) => {
  try {
    const data = await Todo.find().findByQuery("read");
    res.status(200).json({
      data,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({ error: "error occurrred" });
  }
});

//get by id
router.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      data: data,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({ error: "error occurred" });
  }
});

router.post("/", checkLogin, async (req, res) => {
  const newTodo = new Todo({
    ...req.body,
    user: req.userId,
  });
  try {
    await newTodo.save();
    await User.updateOne(
      {
        _id: req.userId,
      },
      {
        $push: {
          todos: todo_id,
        },
      }
    );

    console.log(newTodo);
    res.status(200).json({
      messaage: "todo is ineserted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "error occurred" });
  }
});

router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: "error occured due to server error" });
    } else {
      res.status(200).json({ message: "inserted successfully" });
    }
  });
});

router.put("/:id", async (req, res) => {
  const reuslt = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    { useFindAndModify: false },
    (err) => {
      if (err) {
        res.status(500).json({ error: "error occured" });
      } else {
        res.status(200).json({ message: "inserted successfully" });
      }
    }
  );
});
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({ error: "error occurrred" });
    } else {
      res.status(200).json({ message: "successfully deleted" });
    }
  });
});

router.get("/all", (req, res) => {});
module.exports = router;
