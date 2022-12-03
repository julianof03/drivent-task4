import { prisma } from "@/config";

export async function createBookingWithBody(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}
