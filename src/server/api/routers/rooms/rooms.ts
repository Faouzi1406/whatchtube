import { TRPCError } from "@trpc/server";
import { number, z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { initTRPC } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';
import { Rooms } from "../../../../classes/rooms";
import { redirect } from "next/dist/server/api-utils";

const ee = new EventEmitter();

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

export const roomsSubscribtions = createTRPCRouter({
  roomSub:  protectedProcedure
  .input(z.object!({ roomId:z.string() }))
  .subscription(async ({ input, ctx }) => {
    const rooms = new Rooms();
    const roomExists = rooms.getRoom(input.roomId);

    const roomDbCheck = await ctx.prisma.room.count({
      where: {
        roomId: input.roomId
      }
    });

    if(roomDbCheck == 0){
      throw new TRPCError(roomNotFound);
    };

    if (roomExists == "room not found"){
      rooms.addRoom({
        roomId:input.roomId,
        users: [],
        owner: ctx.session.user,
        messages: []
      });
    };

    console.log(rooms.rooms);

    return rooms.rooms;
  }), 
});
