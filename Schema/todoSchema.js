const mongoose = require("mongoose");
const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
//custom model instance methods

todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({
      status: "active",
    });
  },
};
//statics methods
todoSchema.statics = {
  findJs: function () {
    return this.find({ title: /read/i });
  },
};

todoSchema.query = {
  findByQuery: function (query) {
    return this.find({ title: new RegExp(query, "i") });
  },
};
module.exports = todoSchema;
