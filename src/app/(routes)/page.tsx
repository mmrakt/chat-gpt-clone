import { redirect } from "next/navigation";
import { fetchApi } from "@app/_utils";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { Chat } from "@prisma/client";
import { getServerSession } from "next-auth";


export default async function Page({ params }: { params: { chatId: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return;

  // let res = await fetchApi(`/chats/?userId=${session.user.id}`);
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/?userId=${session.user.id}`,
  );
  console.log(res.status);
  const chats = await res.json();

  console.log('here');
  console.log(chats);
  if (chats.length !== 0) {
    redirect(`/c/${chats[0].id}`);
  }

  res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats`, {
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
