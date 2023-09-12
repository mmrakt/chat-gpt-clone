import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";
import ReactMarkdown from "react-markdown";

type Props = {
  children: string;
};

export const MarkdownRenderer = ({ children }: Props) => {
  return (
    <div className="">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
        }}
        className="markdown"
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};
