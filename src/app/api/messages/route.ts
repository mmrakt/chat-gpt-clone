import { NextResponse } from "next/server";
import { prisma } from "@app/_libs/prisma";
import { Message } from "@prisma/client";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const chatId = searchParams.get("chatId");
  if (!chatId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const messages = await prisma.message.findMany({
    where: {
      chatId: {
        equals: chatId,
      },
    },
  });

  return NextResponse.json(messages, { status: 200 });
};

export const POST = async (req: Request) => {
  const { chatId, content, role } = (await req.json()).message as Message;
  try {
    await prisma.message.create({
      data: {
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
