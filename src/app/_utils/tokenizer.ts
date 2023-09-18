import { INPUT_TOKEN_LIMIT } from "../_config";
import { isWithinTokenLimit } from "gpt-tokenizer/model/text-davinci-003";

export const isWithinLimitTokenCount = (text: string) => {
  return isWithinTokenLimit(text, INPUT_TOKEN_LIMIT);
};
