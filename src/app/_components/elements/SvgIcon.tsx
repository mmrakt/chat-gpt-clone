import avatar from "../../../../public/avatar.svg";
import bad from "../../../../public/bad.svg";
import chatGpt from "../../../../public/chat-gpt.svg";
import chat from "../../../../public/chat.svg";
import clipboard from "../../../../public/clipboard.svg";
import cross from "../../../../public/cross.svg";
import cycle from "../../../../public/cycle.svg";
import dots from "../../../../public/dots.svg";
import edit from "../../../../public/edit.svg";
import externalLink from "../../../../public/external-link.svg";
import github from "../../../../public/github.svg";
import good from "../../../../public/good.svg";
import hamburger from "../../../../public/hamburger.svg";
import keyboardShortcuts from "../../../../public/keyboard-shortcuts.svg";
import lock from "../../../../public/lock.svg";
import plus from "../../../../public/plus.svg";
import sendMessage from "../../../../public/send-message.svg";
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
};

type Name = keyof typeof icons;

type Props = {
  name: Name;
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
