import mongoose from "mongoose";

const ChildSchema = new mongoose.Schema({
  name: String,
  username: String,
  pin: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" }
});

export default mongoose.model("Child", ChildSchema);
