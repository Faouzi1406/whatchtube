import { z } from "zod";

export const CreateForm = z.object!({
  roomName: z.string().min(5, { message: "Room name needs to have a minimum of 5 characters!" }).max(30, { message: "Room name has a maximum of 30 characters!" }),
  roomLink: z.string().url({ message: "This is not a valid url!" }),
  roomInvites: z.array(z.string())
})

export type createFormType = z.infer<typeof CreateForm>;

export type succesCreateForm = {
  roomId: String,
  status: String
}
