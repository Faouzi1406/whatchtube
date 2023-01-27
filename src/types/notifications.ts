import { z } from "zod";

export const getUserNotifications = z.object!({
  id:z.string().min(1, { message:"Failed to get user id."})
});
