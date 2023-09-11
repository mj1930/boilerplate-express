import mongoose, { Schema } from "mongoose";

const slotSchema = new Schema({
    // dean id
    dId: {
        type: mongoose.Types.ObjectId,
        ref: "dean"
    },
    bookingDateTime: {
        type: String,
        default: ""
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    bookedBy: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

export const slot = mongoose.model('slot', slotSchema);