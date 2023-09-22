import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
    userType: {
        type: String,
        default: "",
        enum: ['student', 'dean']
    },
    bookedSlots: [
        {
            // student or dean id
            id: {
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

export const user = mongoose.model('dean', userSchema);