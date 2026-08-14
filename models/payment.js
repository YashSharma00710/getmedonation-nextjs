import mongoose from "mongoose";

const paymentschema = new mongoose.Schema({
    name: { type: String, required: true },
    to_user: { type: String, required: true },
    oid: { type: String, required: true },
    message: { type: String, required: true },
    amount: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    done: { type: Boolean, default: false }
})
export default mongoose.models.Payment ||mongoose.model("Payment", paymentschema)