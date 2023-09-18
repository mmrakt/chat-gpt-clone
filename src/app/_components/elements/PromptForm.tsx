// "use client";

// import { useRef } from "react";
// import { SvgIcon } from "./SvgIcon";
// import LoadingSpinner from "@app/_components/elements/LoadingSpinner";
// import useAutosizeTextArea from "@app/_hooks/useAutosizeTextArea";
// import { twMerge } from "tailwind-merge";

// type Props = {
//   input: string;
//   onChange: () => void;
//   isGenerating: boolean;
// };

// const PromptForm = ({ input, onChange, isGenerating }: Props) => {
//   const textAreaRef = useRef<HTMLTextAreaElement>(null);
//   useAutosizeTextArea(textAreaRef.current, input);

//   return (
//     <div className="flex w-full items-center rounded-xl border-[1px] border-[rgba(0,0,0,.1)] bg-white px-3 py-[10px] shadow-sm dark:bg-gray-500 md:p-4">
//       <textarea
//         className="max-h-50 h-6 w-full resize-none overflow-y-auto bg-inherit align-middle placeholder-gray-700 focus:outline-none focus-visible:outline-none"
//         placeholder="Send a message"
//         onChange={onChange}
//         ref={textAreaRef}
//         id="prompt"
//         value={input}
//         rows={1}
//       ></textarea>
//       {isGenerating ? (
//         <LoadingSpinner className="" />
//       ) : (
//         <button
//           type="submit"
//           className={twMerge(
//             "self-end rounded-lg p-2 transition-colors duration-200",
//             input !== "" ? "bg-green-500" : "",
//           )}
//         >
//           <SvgIcon
//             name="sendMessage"
//             className={twMerge(
//               !!input ? "text-white" : "text-gray-800 dark:text-gray-700",
//             )}
//             fillColor={!!input ? "#fff" : ""}
//           />
//         </button>
//       )}
//     </div>
//   );
// };

// export default PromptForm;
