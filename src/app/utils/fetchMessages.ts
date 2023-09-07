import { prisma } from "../../libs/prisma";

const fetchMessages = async (userId?: string) => {
  if (!userId) return [];
  const messages = await prisma.message.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });
  return messages;
};

export default fetchMessages;
