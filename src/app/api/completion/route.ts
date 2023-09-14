import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  }),
);

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    max_tokens: 100,
    messages: messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
