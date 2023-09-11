import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { dean } from "./dean.model";
import { slot } from "../slots/slot.model";
import moment from "moment";
const secret = process.env.JWT_SECRET;

export const deanLogin = async (req: Request, res: Response) => {
    try {
        const { universityId, password } = req.body;
        if (!universityId) {
            return res.status(400).json({
                statusCode: 500,
                message: "API failed at dean login",
                data: null
            });
        }
        if (!password) {
            return res.status(400).json({
                statusCode: 400,
                message: "Password is required",
                data: null
            });
        }
        const deanDetail = await dean.findOne({ uniId: universityId });
        if (deanDetail) {
            const isPassMatch = await bcrypt.compare(password, deanDetail.pswd);
            if (isPassMatch) {
                const token = jwt.sign({
                    data: deanDetail._id
                }, secret as Secret, { expiresIn: '24h' });
                return res.status(200).json({
                    statusCode: 200,
                    message: "Dean login successful",
                    data: token
                });
            } else {
                return res.status(200).json({
                    statusCode: 200,
                    message: "Password does not match",
                    data: null
                });
            }
        } else {
            return res.status(200).json({
                statusCode: 200,
                message: "No dean found",
                data: null
            });
        }
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: "API failed at dean login",
            data: null
        });
    }
};

export const deanSignup = async (req: Request, res: Response) => {
    try {
        const { universityId, name, password } = req.body;
        if (!universityId) {
            return res.status(400).json({
                statusCode: 400,
                message: "University Id is required",
                data: null
            });
        }
        if (!password) {
            return res.status(400).json({
                statusCode: 400,
                message: "Password is required",
                data: null
            });
        }
        if (!name) {
            return res.status(400).json({
                statusCode: 400,
                message: "Name is required",
                data: null
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const savedDean = await dean.create({
            name,
            pswd: hashedPassword,
            uniId: universityId
        });
        return res.status(200).json({
            statusCode: 200,
            message: "Dean data saved successfully",
            data: savedDean
        });
    } catch (err: any) {
        if (err?.code === 11000) {
            return res.status(500).json({
                statusCode: 500,
                message: "Same key already exists in database",
                data: null
            });
        }
        return res.status(500).json({
            statusCode: 500,
            message: "API failed at dean login",
            data: null
        });
    }
}

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