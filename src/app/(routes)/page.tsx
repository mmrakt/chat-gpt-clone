import { redirect } from "next/navigation";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@app/_libs/prisma";


export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) return;

  // TODO: https://github.com/mmrakt/chat-gpt-clone/issues/11
  const chats = await prisma.chat.findMany({
    where: {
      userId: {
        equals: session.user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (chats.length !== 0) {
    redirect(`/c/${chats[0].id}`);
  }

  let newChat
  try {
    newChat = await prisma.chat.create({
      data: {
        userId: session.user.id,
        title: "New chat",
      },
    });
  } catch (error) {
    console.error(error);
  }
  if (newChat) {
    redirect(`/c/${newChat.id}`);
  }
}
