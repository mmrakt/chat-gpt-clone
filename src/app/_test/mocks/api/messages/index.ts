import { Message } from "ai";
import { MockedRequest, ResponseResolver, restContext } from "msw";

const get: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx,
) => {
  const data: Message[] = [
    {
      id: "001",
      role: "user",
      content: "message-content-001",
    },
    {
      id: "002",
      role: "assistant",
      content: "message-content-002",
    },
    {
      id: "003",
      role: "user",
      content: "message-content-003",
    },
    {
      id: "004",
      role: "assistant",
      content: "message-content-004",
    },
  ];
  return res(ctx.status(200), ctx.json(data));
};

const post: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx,
) => {
  return res(ctx.status(200));
};

export { get, post };
