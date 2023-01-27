import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { CreateForm, succesCreateForm } from "../../../../types/create-room-types";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../trpc";

const error: TRPCError = {
  name: "couldn't find user invites",
  code: "INTERNAL_SERVER_ERROR",
  message: "Couldn't find any invites linked to user"
};

export const notifications = createTRPCRouter({
  getUserNotifications: protectedProcedure
    .query((async ({ ctx }) => {
      const userInvites = await ctx.prisma.roomInvites.findMany({
        where: {
          userId: ctx.session.user.id
        },
        include: {
          room: true,
        }
      }).catch(() => { throw new TRPCError(error) });

      return {
        invites: userInvites,
        userId: ctx.session.user.id,
        message: "invites to this user"
      }
    }))
})
