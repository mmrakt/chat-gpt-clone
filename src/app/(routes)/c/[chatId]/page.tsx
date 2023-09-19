import { notFound, redirect } from "next/navigation";
import ChatContainer from "@app/_components/elements/ChatContainer";
import { fetchApi } from "@app/_utils";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { Chat } from "@prisma/client";
import { getServerSession } from "next-auth";


export default async function Page({ params }: { params: { chatId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  const res = await fetchApi(`/chats/${params.chatId}`);
  console.log('hoge');
  console.log(res.status);
  if (res.status === 404) {
    notFound();
  }

  const chat = (await res.json()) as Chat;
  if (chat.userId !== session.user.id) {
    notFound();
  }

  return <ChatContainer user={session.user} chatId={chat.id} />;
}
