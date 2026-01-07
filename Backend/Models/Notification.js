import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    }
});

export default mongoose.model("Notification", notificationSchema);