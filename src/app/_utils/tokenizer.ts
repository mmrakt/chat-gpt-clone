import { isWithinTokenLimit } from "gpt-tokenizer";

const INPUT_TOKEN_LIMIT = 1000;

export const isWithinLimitTokenCount = (text: string) => {
  return isWithinTokenLimit(text, INPUT_TOKEN_LIMIT);
};
