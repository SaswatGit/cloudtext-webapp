import mongoose from "mongoose";


const pasteTextSchema = new mongoose.Schema({
    pid: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    ttl_seconds: {
        type: Number,
        default: 0
    },
    max_views: {
        type: Number,
        default: 0
    },
    remaining_views: {
        type: Number,
        default: function () {
            return this.max_views;
        }
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    expire_time: {
        type: Date,
        default: null,
    }
});



export default mongoose.models.Paste || mongoose.model("Paste", pasteTextSchema);
