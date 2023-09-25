import { MockedRequest, ResponseResolver, restContext } from "msw";

const get: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx,
) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        id: 1,
        userId: "user-id-001",
        title: "chat-title-001",
      },
      {
        id: 2,
        userId: "user-id-001",
        title: "chat-title-002",
      },
      {
        id: 3,
        userId: "user-id-001",
        title: "chat-title-003",
      },
    ]),
  );
};

const post: ResponseResolver<MockedRequest, typeof restContext> = (
  req,
  res,
  ctx,
) => {
  return res(ctx.status(200));
};

export default { get, post };
