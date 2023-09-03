import { Request, Response } from "express";
import { slot } from "./slot.model";
import moment from "moment";

export const addNewSlot = async (req: Request, res: Response) => {
    try {
        const { deanId, date } = req.body;
        const day = new Date(date).getDay()
        if (day != 4 && day != 5) {
            return res.status(200).json({
                statusCode: 200,
                message: "Date given is not Thrusday or Friday",
                data: null
            });
        };
        const time = '10:00';
        const bookingDateTime = moment(date + ' ' + time).unix();
        const addDeanSlot = await slot.create({
            dId: deanId,
            bookingDateTime
        });
        return res.status(200).json({
            statusCode: 200,
            message: "New slot added successfully",
            data: addDeanSlot
        });
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: "API failed at slot booking",
            data: null
        });
    }
}

export const listAllSlot = async (req: Request, res: Response) => {
    try {
        const dateTime = moment().unix();
        const allSlots = await slot.find(
            {
                $and: [
                    {
                        "bookingDateTime": {
                            $gte: dateTime
                        }
                    },
                    {
                        "isBooked": false
                    }
                ]
            }).lean();
        return res.status(200).json({
            statusCode: 200,
            message: "All list fetched successfully",
            data: allSlots
        });
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: "API failed at lisiting slot",
            data: null
        });
    }
}