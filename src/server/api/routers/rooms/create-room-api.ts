import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { CreateForm, succesCreateForm } from "../../../../types/create-room-types";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../trpc";

const CreateRoomFormError: TRPCError = {
  name: "db-error",
  code: 'INTERNAL_SERVER_ERROR',
  message: 'Error creating room!'
};


export const createRoomApi = createTRPCRouter({
  createRoom: protectedProcedure
    .input(CreateForm)
    .mutation(async ({ input, ctx, }) => {

      const createForm = await ctx.prisma.room.create({
        data: {
          roomName: input.roomName,
          roomLink: input.roomLink,
          roomOwner: ctx.session.user.id,
        }
      }).catch(() => { throw new TRPCError(CreateRoomFormError) });

      //Creating invites
      for (let i = 0; i < input.roomInvites.length; i++) {
        ctx.prisma.roomInvites.create({
          data: {
            userId: input.roomInvites[i],
            roomIdInvite: createForm.roomId,
          }
        }).catch((e) => {console.log(e);throw new TRPCError(CreateRoomFormError)});
      };

      const succesCreatedRoom: succesCreateForm = {
        roomId: createForm.roomId,
        status: "Create room succesfully!"
      };

      return succesCreatedRoom;
    }),
})
