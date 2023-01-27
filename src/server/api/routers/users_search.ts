import { User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { equal, notEqual } from "assert";
import { createTRPCRouter, protectedProcedure } from "../trpc"

const userAllError:TRPCError = {
  name:'db-error',
  code:'INTERNAL_SERVER_ERROR',
  message:'something went wrong getting all users.'
}

export const usersApi = createTRPCRouter({
  allUsers:protectedProcedure
  .mutation( async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id:true,
        name:true,
        image:true
      },
      where:{
        NOT: {
          name: ctx.session.user.name
        }
      }
    }).catch(() => {
      throw new TRPCError(userAllError);
    });

    return users;
  })
})
