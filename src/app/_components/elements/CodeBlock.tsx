// import styled from "@emotion/styled";
// import { Flex, Text } from "@mantine/core";
import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import { useClipboard } from "@mantine/hooks";

export const CodeBlock: CodeComponent = (options) => {
  //   const clipboard = useClipboard({ timeout: 700 });

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

        {/* <Flex
          align="center"
          sx={{ cursor: "pointer" }}
          onClick={() => clipboard.copy(children[0])}
        >
          {clipboard.copied ? (
            <IconClipboardCheck size={16} />
          ) : (
            <IconClipboard size={16} />
          )}
          <Text ml={4}>{clipboard.copied ? "コピーしました！" : "コピー"}</Text>
        </Flex>
      </Flex> */}
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

{
  /* const CodeBlockWrapper = styled.div`
  > pre {
    border-radius: 0 0 6px 6px;
    margin-top: 0 !important;
  }
`; */
}
