import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    username: { type: String, min: 3, required: true },
    profilepic: { type: String, min: 3 },
    coverpic: { type: String, min: 3 },
    razorpayid: { type: String, min: 3 },
    razorpaysecret: { type: String, min: 3 },
    createdAt: { type: Date, default: Date.now() },

});

export default mongoose.models.User || mongoose.model("User", userSchema);