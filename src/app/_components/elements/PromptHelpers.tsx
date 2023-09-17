import { SvgIcon } from "./SvgIcon";

const PromptHelpers = () => {
  const helpers = [
    {
      title: "Show me a code snippet",
      desc: "of a website's sticky header",
      message: "",
    },
    {
      title: "Compare business strategies",
      desc: "for transitioning from budget to luxury vs. luxury to budget",
      message: "",
    },
    {
      title: "Come up with concepts",
      desc: "for a retro-style arcade game",
      message: "",
    },
    {
      title: "Recommend activities",
      desc: "for a team-building day with remote employees",
      message: "",
    },
  ];
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 px-3">
      {helpers.map((helper) => (
        <button
          key={helper.title}
          className="group relative flex cursor-not-allowed items-center justify-between rounded-xl border-[1px] border-[rgba(0,0,0,.1)] px-3 py-2 text-start text-sm hover:bg-gray-900 dark:border-gray-600 dark:hover:bg-gray-500"
        >
          <div className="flex w-full flex-col">
            <span className="font-bold dark:text-gray-800">{helper.title}</span>
            <span className="overflow-x-hidden text-ellipsis whitespace-nowrap text-gray-700">
              {helper.desc}
            </span>
          </div>
          <div className="absolute right-3 hidden group-hover:block">
            <SvgIcon
              name="sendMessage"
              className="text-gray-200 dark:text-gray-800"
            />
          </div>
        </button>
      ))}
    </div>
  );
};

export default PromptHelpers;
