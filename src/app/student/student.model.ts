import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
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
    // bookedSlots
    bkdSlt: [
        {
            // Dean Id
            dId: {
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

export const student = mongoose.model('student', studentSchema);