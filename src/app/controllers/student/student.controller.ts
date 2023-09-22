import { Request, Response } from "express";
import { slot } from "../slots/slot.model";
import { user } from "../users/user.model";
const secret = process.env.JWT_SECRET;

export const bookNewSlot = async (req: Request, res: Response) => {
    try {
        const { deanId, timeSlotId } = req.body;
        const userId = req.query.userId;
        if (!deanId) {
            return res.status(400).json({
                statusCode: 400,
                message: "Dean Id is required",
                data: null
            });   
        }
        if (!timeSlotId) {
            return res.status(400).json({
                statusCode: 400,
                message: "Timeslot Id is required",
                data: null
            });   
        }
        if (!userId) {
            return res.status(400).json({
                statusCode: 400,
                message: "User Id is required",
                data: null
            });   
        }
        const bookSlot = await user.findOneAndUpdate({
            _id: userId
        }, {
            $push: {
                bkdSlt: {
                    dId: deanId,
                    timeSlotId
                }
            }
        }, {
            new: true,
            password: 0
        });
        if (!bookSlot) {
            return res.status(200).json({
                statusCode: 200,
                message: "No data found",
                data: null
            });
        }
        await slot.findOneAndUpdate({
            dId: deanId,
            "_id": timeSlotId
        }, {
            $set: {
                "isBooked": true,
                "bookedBy": bookSlot.name
            }
        });
        return res.status(200).json({
            statusCode: 200,
            message: "Slot booked successfully",
            data: bookSlot
        });
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: "API failed at student login",
            data: null
        });
    }
}