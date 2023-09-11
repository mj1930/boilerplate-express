import mongoose, { Schema } from "mongoose";

const deanSchema = new Schema({
    name: {
        type: String,
        default: "",
        required: true
    },
    // university id
    uniId: {
        type: String,
        default: "",
        required: true,
        unique: true
    },
    // password
    pswd: {
        type: String,
        default: "",
        required: true
    },
    bookedSlots: [
        {
            // student id
            sId: {
                type: mongoose.Types.ObjectId,
                ref: "dean"
            },
            timeSlotId: {
                type: mongoose.Types.ObjectId,
                ref: "slot"
            }
        }
    ]
}, {
    timestamps: true
});

export const dean = mongoose.model('dean', deanSchema);