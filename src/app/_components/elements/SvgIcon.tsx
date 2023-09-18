import avatar from "../../../../public/avatar.svg";
import bad from "../../../../public/bad.svg";
import chatGpt from "../../../../public/chat-gpt.svg";
import chat from "../../../../public/chat.svg";
import clipboard from "../../../../public/clipboard.svg";
import cross from "../../../../public/cross.svg";
import customInstruction from "../../../../public/custom-instruction.svg";
import cycle from "../../../../public/cycle.svg";
import dots from "../../../../public/dots.svg";
import edit from "../../../../public/edit.svg";
import externalLink from "../../../../public/external-link.svg";
import github from "../../../../public/github.svg";
import good from "../../../../public/good.svg";
import google from "../../../../public/google.svg";
import hamburger from "../../../../public/hamburger.svg";
import keyboardShortcuts from "../../../../public/keyboard-shortcuts.svg";
import lock from "../../../../public/lock.svg";
import logout from "../../../../public/logout.svg";
import plus from "../../../../public/plus.svg";
import remove from "../../../../public/remove.svg";
import sendMessage from "../../../../public/send-message.svg";
import setting from "../../../../public/setting.svg";
import sideMenu from "../../../../public/side-menu.svg";
import square from "../../../../public/square.svg";
import star from "../../../../public/star.svg";
import upload from "../../../../public/upload.svg";
import { twMerge } from "tailwind-merge";

const icons = {
  avatar,
  edit,
  good,
  bad,
  clipboard,
  cycle,
  chatGpt,
  chat,
  star,
  lock,
  upload,
  externalLink,
  keyboardShortcuts,
  sendMessage,
  square,
  plus,
  hamburger,
  github,
  dots,
  cross,
  sideMenu,
  remove,
  setting,
  logout,
  customInstruction,
  google,
};

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
  size?: number;
  fillColor?: string;
  className?: string;
};

const DEFAULT_SIZE = 16;

export function SvgIcon({
  name,
  size = DEFAULT_SIZE,
  className,
  fillColor,
}: Props) {
  const Svg = icons[name];

  return (
    <Svg
      className={twMerge("", className)}
      width={size}
      height={size}
      fill={fillColor ?? "none"}
    />
  );
}
