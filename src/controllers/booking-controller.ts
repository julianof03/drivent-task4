import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(Number(userId));
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId  = req.body.roomId;
  
  try {
    const booking = await bookingService.postBooking(Number(userId), roomId);

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "businessRuleError") return res.sendStatus(httpStatus.FORBIDDEN);
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId  = req.body.roomId;
  const bookingId = req.params.bookingId;
  
  try {
    const booking = await bookingService.putBooking(Number(userId), roomId, Number(bookingId));

    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "businessRuleError") return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
