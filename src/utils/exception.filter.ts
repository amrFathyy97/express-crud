import { NextFunction, Request, Response } from "express";



export default (err: any, req: Request, res: Response, next: NextFunction) => {
    return res.json({
        status: err.status,
        message: err.message 
    })
}