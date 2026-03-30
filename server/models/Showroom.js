import mongoose from "mongoose";

const showroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Showroom = mongoose.model("Showroom", showroomSchema);

export default Showroom;