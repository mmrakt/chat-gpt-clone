import { NextResponse } from "next/server";
import { Message, prisma } from "../../../../../libs/prisma";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } },
) => {
  const { userId } = params;
  const messages = await prisma.message.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
  });
  return NextResponse.json(messages);
};

export const POST = async (
  req: Request,
  { params }: { params: { userId: string } },
) => {
  const { userId, chatId, content, role } = (await req.json()) as Message;
  let res;
  try {
    const res = await prisma.message.create({
      data: {
        userId,
        chatId: chatId,
        content: content,
        role: role,
      },
    });
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json(res);
};
