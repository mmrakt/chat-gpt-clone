import { CodeBlock } from "./CodeBlock";
import ReactMarkdown from "react-markdown";

type Props = {
  children: string;
};

export const MarkdownRenderer = ({ children }: Props) => {
  return (
    <div className="">
      <ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
