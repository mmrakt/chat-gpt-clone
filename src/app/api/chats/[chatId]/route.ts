import { NextResponse } from "next/server";
import { prisma } from "@app/_libs/prisma";
import { Chat } from "@prisma/client";

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

export const PATCH = async (
  req: Request,
  { params }: { params: { chatId: string } },
) => {
  const title = await req.json();
  let chat: Chat;
  try {
    chat = await prisma.chat.update({
      where: {
        id: params.chatId,
      },
      data: {
        title,
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

export const DELETE = async (
  req: Request,
  { params }: { params: { chatId: string } },
) => {
  try {
    await prisma.chat.delete({
      where: {
        id: params.chatId,
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
