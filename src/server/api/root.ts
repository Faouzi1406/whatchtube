import { createTRPCRouter } from "./trpc";
import { usersApi } from "./routers/users_search";
import { createRoomApi } from "./routers/rooms/create-room-api";
import { notifications } from "./routers/notification_service/notifications_api";
import { rooms, roomsSubscribtions } from "./routers/rooms/rooms";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  usersApi:usersApi,
  createRoom:createRoomApi,
  notificationsApi:notifications,
  rooms,
  roomsSubscribtions
});

// export type definition of API
export type AppRouter = typeof appRouter;
