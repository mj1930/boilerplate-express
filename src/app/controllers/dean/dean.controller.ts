import { Request, Response } from "express";
import { slot } from "../slots/slot.model";
import moment from "moment";

export const checkAllBookedSlots = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId;
        const dateTime = moment().unix();
        const fetchAllSlots = await slot.find(
            {
                $and: [
                    {
                        dId: userId
                    },
                    {
                        "bookingDateTime": {
                            $gte: dateTime
                        }
                    },
                    {
                        "isBooked": true
                    }
                ]
            }).lean()
        return res.status(200).json({
            statusCode: 200,
            message: "Found All available slots for dean",
            data: fetchAllSlots
        });
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: "API failed at booking dean slot",
            data: null
        })
    }
}