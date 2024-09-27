import { Request, Response } from "express";
import { paymentServices } from "./payment.service";


const confirmationController = async (req: Request, res: Response) => {
    const { tranId,slots } = req.query;
    const result = await paymentServices.confirmationService(tranId as string,slots as string);
    res.redirect(result as string)
};

export const paymentControler = {
    confirmationController
}