import { Message } from "@prisma/client";
import { prisma } from "../../libs/prisma";

type CreateMessage = {
  message: Message;
  userId?: string;
};
const createMessages = async ({ message, userId }: CreateMessage) => {
  if (!userId) return [];
  try {
    await prisma.message.create({
      data: {
        userId,
        chatId: message.chatId,
        content: message.content,
        role: message.role,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default createMessages;
