import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const CodeBlock: CodeComponent = (options) => {
  const { inline, className, children } = options;
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || "");
  const lang = match?.[1];

  return (
    <div className="">
      <div className="flex justify-between rounded-t-md bg-gray-400 px-4 py-2 text-xs text-gray-800">
        <span>{lang}</span>
      </div>
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={lang}
        customStyle={{ margin: "0px" }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
};
