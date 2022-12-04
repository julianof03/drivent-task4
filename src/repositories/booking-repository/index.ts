import { prisma } from "@/config";

async function findbookingByuserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: { Room: true },
  });
}

async function findbookingByRoomId(roomId: number) {
  return prisma.booking.findFirst({
    where: {
      roomId,
    },
    include: { Room: true },
  });
}
async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    },
  });
}
async function findRoomsByRoomId(id: number) {
  return prisma.room.findFirst({
    where: {
      id: id,
    },
  });
}

const bookingRepository = {
  findbookingByuserId,
  findbookingByRoomId,
  findRoomsByRoomId,
  createBooking,
};

export default bookingRepository;
