import Image from "next/image";
import styles from "./page.module.css";
import Star from "./star";
import Lock from "./Lock";
import Header from "./Header";

export default function Home() {
  const messages = [];
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
    <>
      <Header />
      <div className="">
        {messages.length !== 0 ? (
          <div className=""></div>
        ) : (
          <div className="px-8">
            <div className="flex justify-center">
              <h1 className="text-gray-600 text-4xl font-semibold">ChatGPT</h1>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-60">
              {helpers.map((helper) => (
                <button
                  key={helper.title}
                  className="border-[1px] border-gray-600 rounded-lg text-start px-3 py-2 text-sm"
                >
                  <p className="">{helper.title}</p>
                  <p className="text-gray-700">{helper.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
