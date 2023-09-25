import React from "react";
import ChatContainer from "@app/_components/elements/ChatContainer";
import { createQueryWrapper } from "@app/_test/createQueryWrapper";
import { server } from "@app/_test/mocks/server";
import { Message, User } from "@prisma/client";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest";

export const dummyUser: User = {
  id: "user-id-001",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "john doe",
  email: "dummy@example.com",
  emailVerified: null,
  image: null,
};

describe("ChatContainer", () => {
  beforeAll(() => {
    server.listen();
    vi.mock("next/navigation", () => require("next-router-mock"));
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("render", async () => {
    const queryWrapper = createQueryWrapper().queryWrapper;
    const { findByText, queryByText } = render(
      <ChatContainer user={dummyUser} chatId="chat-id-001" />,
      {
        wrapper: queryWrapper,
      },
    );
    expect(await findByText("message-content-001")).toBeInTheDocument();
    expect(await findByText("message-content-002")).toBeInTheDocument();
    expect(await findByText("message-content-003")).toBeInTheDocument();
    expect(await findByText("message-content-004")).toBeInTheDocument();
    expect(queryByText("message-content-005")).not.toBeInTheDocument();
  });

  test.only("submit", async () => {
    const queryWrapper = createQueryWrapper().queryWrapper;
    const result = render(
      <ChatContainer user={dummyUser} chatId="chat-id-001" />,
      {
        wrapper: queryWrapper,
      },
    );
    vi.mock("ai/react", async () => {
      const originalModule = await vi.importActual("ai/react");
      return {
        __esModule: true,
        // @ts-ignore
        ...originalModule,
        messages: [
          {
            id: "message-id-001",
            chatId: "chat-id-001",
            role: "user",
            content: "Hello ChatGPT",
          },
          {
            id: "message-id-002",
            chatId: "chat-id-001",
            role: "assistant",
            content: "Hello!",
          },
        ] as Message[],
      };
    });

    const user = userEvent.setup();
    await waitFor(async () => {
      const textBox = screen.getByRole("textbox");
      user.type(textBox, "Hello ChatGPT");
      const submitButton = screen.getByTestId("submitButton");
      user.click(submitButton);
      // await waitFor(() => expect(mockFn).toHaveBeenCalledTimes(2));
    });
  });
});
