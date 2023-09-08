import { Message } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
  const messages = await prisma.message.findMany({
    where: {
      userId: {
        equals: session.user.id,
      },
    },
  });

  return NextResponse.json(messages, { status: 200 });
};

export const POST = async (req: Request) => {
  const { userId, chatId, content, role } = (await req.json())
    .message as Message;
  try {
    await prisma.message.create({
      data: {
        userId: userId,
        chatId: chatId,
        content: content,
        role: role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
  return NextResponse.json({ status: 200 });
};
