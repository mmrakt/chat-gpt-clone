import { Chat } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
  const chats = await prisma.chat.findMany({
    where: {
      userId: {
        equals: userId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(chats, { status: 200 });
};

export const POST = async (req: Request) => {
  const json = await req.json();
  const { userId } = json;
  let chat: Chat;
  try {
    chat = await prisma.chat.create({
      data: {
        userId: userId,
        title: "New chat",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
  return NextResponse.json(chat, { status: 200 });
};
