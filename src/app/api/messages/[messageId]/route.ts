import { NextResponse } from "next/server";
import { prisma } from "@app/_libs/prisma";

export const DELETE = async (
  req: Request,
  { params }: { params: { messageId: string } },
) => {
  try {
    await prisma.message.delete({
      where: {
        id: params.messageId,
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
