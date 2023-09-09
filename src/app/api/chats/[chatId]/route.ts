import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";

export const GET = async (
  req: Request,
  { params }: { params: { chatId: string } },
) => {
  if (!params.chatId) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
  const chat = await prisma.chat.findUnique({
    where: {
      id: params.chatId,
    },
  });
  if (!chat) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(chat, { status: 200 });
};
