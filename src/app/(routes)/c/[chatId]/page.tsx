import { notFound, redirect } from "next/navigation";
import PageContainer from "@app/_components/elements/PageContainer";
import { prisma } from "@app/_libs/prisma";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Page({ params }: { params: { chatId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  // TODO: https://github.com/mmrakt/chat-gpt-clone/issues/11
  const chat = await prisma.chat.findUnique({
    where: {
      id: params.chatId,
    },
  });
  if (!chat) {
    notFound();
  }

  if (chat.userId !== session.user.id) {
    notFound();
  }

  return <PageContainer user={session.user} chatId={params.chatId} />;
}
