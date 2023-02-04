import { t } from '../../trpc';
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';
import { z } from 'zod';
import { zodRoom } from '../../../../types/room_data';

const ee = new EventEmitter();

export const roomJoin = t.router({
  onJoinRoom: t.procedure.subscription(() => {
    return observable((subscriber) => {
      const onJoinRoom = (data: any) => {
        subscriber.next(data);
      }

      ee.on('join-room', onJoinRoom);

      return () => {
        ee.off('join-room', onJoinRoom);
      }
    });

  }),

  joinRoom: t.procedure.input(zodRoom).mutation(async ({ input, ctx }) => {
    const { room_id } = input;
    const room = await ctx.prisma.room.findUnique({
      where: {
        roomId: room_id,
      },
    });

    if (!room) {
      throw new Error('Room not found');
    }

    ee.emit('join-room', room);
    return room;
  }),
});
