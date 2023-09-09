import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import fetchChats from "./utils/fetchChat";

export default async function Page({ params }: { params: { chatId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const chats = await fetchChats(session.user.id);
  if (chats.length !== 0) {
    redirect(`/c/${chats[0].id}`);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats`, {
    method: "POST",
    body: JSON.stringify({
      userId: session.user.id,
    }),
  });
  const newChat = await res.json();
  if (newChat) {
    redirect(`/c/${newChat.id}`);
  }
}
