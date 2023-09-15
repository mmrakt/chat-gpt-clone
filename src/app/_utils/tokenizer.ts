import { isWithinTokenLimit } from "gpt-tokenizer/model/text-davinci-003";

const INPUT_TOKEN_LIMIT = 1000;

export const isWithinLimitTokenCount = (text: string) => {
  return isWithinTokenLimit(text, INPUT_TOKEN_LIMIT);
};
