const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestsSchema = mongoose.Schema(
  {
    quest: {
      type: Object,
    },

    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    percent: Number,
   
  },
  { timestamps: true }
);

const Quests = mongoose.model("quests", QuestsSchema);

module.exports = { Quests };
