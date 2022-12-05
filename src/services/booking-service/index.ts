import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { businessRuleError } from "@/errors/business-rule-error";

async function listboking(userId: number, roomId: number) {
  if(roomId < 1) {
    throw businessRuleError();
  }

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw businessRuleError();
  }

  const booking = await bookingRepository.findbookingByRoomId(roomId);
  if(booking) {
    throw businessRuleError();
  } 
  const room = await bookingRepository.findRoomsByRoomId(roomId);
  if(!room) throw notFoundError(); 
}

async function putlistboking(roomId: number) {
  if(roomId < 1) {
    throw businessRuleError();
  }
  const room = await bookingRepository.findRoomsByRoomId(roomId);
  if(!room) throw notFoundError(); 
}

async function getBooking(userId: number) {
  const  repositoryBooking = await bookingRepository.findbookingByuserId(userId);
  if   (!repositoryBooking)  throw notFoundError();
  
  const booking = {
    id: repositoryBooking.id,
    Room: {
      id: repositoryBooking.roomId,
      name: repositoryBooking.Room.name,
      capacity: repositoryBooking.Room.capacity,
      hotelId: repositoryBooking.Room.hotelId,
      createdAt: repositoryBooking.Room.createdAt,
      updatedAt: repositoryBooking.Room.updatedAt,
    }
  };
  return booking;
}

async function postBooking(userId: number, roomId: number) {
  await listboking(userId, roomId);
  const repositoryBooking = await bookingRepository.createBooking(userId, roomId);

  if (!repositoryBooking) {
    throw notFoundError();
  } 
  const booking = {
    bookingId: repositoryBooking.id,
  };
  return booking;
}

async function putBooking(userId: number, roomId: number, bookingId: number) {
  await putlistboking(roomId);
  await listboking(userId, roomId);
  const repositoryBooking = await bookingRepository.createBooking(userId, roomId);

  const booking = {
    bookingId: repositoryBooking.id
  };
  return booking;
}

const bookingService = {
  getBooking,
  postBooking,
  putBooking,
};

export default bookingService;
