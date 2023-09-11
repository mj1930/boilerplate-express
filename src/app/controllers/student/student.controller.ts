import { Request, Response } from "express";
import { student } from "./student.model";
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { slot } from "../slots/slot.model";
const secret = process.env.JWT_SECRET;

export const studentLogin = async (req: Request, res: Response) => {
    try {
        const { universityId, password } = req.body;
        if (!universityId) {
            return res.status(400).json({
                statusCode: 500,
                message: "API failed at student login",
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
        const studentDetail = await student.findOne({ uniId : universityId });
        if (studentDetail) {
            const isPassMatch = await bcrypt.compare(password, studentDetail.pswd);
            if (isPassMatch) {
                const token = jwt.sign({
                    data: studentDetail._id
                }, secret as Secret, { expiresIn: '24h'});
                return res.status(200).json({
                    statusCode: 200,
                    message: "Student login successful",
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
                message: "No student found",
                data: null
            });
        }
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: "API failed at student login",
            data: null
        });
    }
};

export const studentSignup = async (req: Request, res: Response) => {
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
        const savedStudent = await student.create({
            name,
            pswd: hashedPassword,
            uniId: universityId
        });
        return res.status(200).json({
            statusCode: 200,
            message: "Student data saved successfully",
            data: savedStudent
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
            message: "API failed at student login",
            data: null
        });
    }
}

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
        const bookSlot = await student.findOneAndUpdate({
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