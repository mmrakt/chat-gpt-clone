import { CodeBlock } from "./CodeBlock";
import ReactMarkdown from "react-markdown";
import { isError } from "react-query";
import remarkGfm from "remark-gfm";
import { twMerge } from "tailwind-merge";

type Props = {
  children: string;
  isError?: boolean;
};

export const MarkdownRenderer = ({ children, isError }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: CodeBlock,
      }}
      className={twMerge("markdown", isError && "error")}
    >
      {children}
    </ReactMarkdown>
  );
};
