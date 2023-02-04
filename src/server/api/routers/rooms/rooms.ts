import { TRPCError } from "@trpc/server";
import {  z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

const roomNotFound: TRPCError = {
  name: 'Room-Not-Found',
  code: 'NOT_FOUND',
  message: 'Room with this id not found',
}


export const rooms = createTRPCRouter({
  getRoom: protectedProcedure.
    input(z.object!({ roomId: z.string() }))
    .query(async ({ input, ctx }) => {
      const room = await ctx.prisma.room.findUnique({
        where: {
          roomId: input.roomId
        }
      }).catch(e => { throw new TRPCError(roomNotFound) });

      return {
        room,
        id: input.roomId,
        message: 'Room found'
      }
    })
});
