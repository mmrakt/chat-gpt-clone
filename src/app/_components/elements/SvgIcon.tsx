// @ts-ignore
import avatar from "../../../../public/avatar.svg?react";
// @ts-ignore
import bad from "../../../../public/bad.svg?react";
// @ts-ignore
import chatGpt from "../../../../public/chat-gpt.svg?react";
// @ts-ignore
import chat from "../../../../public/chat.svg?react";
// @ts-ignore
import clipboard from "../../../../public/clipboard.svg?react";
// @ts-ignore
import cross from "../../../../public/cross.svg?react";
// @ts-ignore
import customInstruction from "../../../../public/custom-instruction.svg?react";
// @ts-ignore
import cycle from "../../../../public/cycle.svg?react";
// @ts-ignore
import dots from "../../../../public/dots.svg?react";
// @ts-ignore
import edit from "../../../../public/edit.svg?react";
// @ts-ignore
import externalLink from "../../../../public/external-link.svg?react";
// @ts-ignore
import github from "../../../../public/github.svg?react";
// @ts-ignore
import good from "../../../../public/good.svg?react";
// @ts-ignore
import google from "../../../../public/google.svg?react";
// @ts-ignore
import hamburger from "../../../../public/hamburger.svg?react";
// @ts-ignore
import keyboardShortcuts from "../../../../public/keyboard-shortcuts.svg?react";
// @ts-ignore
import lock from "../../../../public/lock.svg?react";
// @ts-ignore
import logout from "../../../../public/logout.svg?react";
// @ts-ignore
import plus from "../../../../public/plus.svg?react";
// @ts-ignore
import remove from "../../../../public/remove.svg?react";
// @ts-ignore
import sendMessage from "../../../../public/send-message.svg?react";
// @ts-ignore
import setting from "../../../../public/setting.svg?react";
// @ts-ignore
import sideMenu from "../../../../public/side-menu.svg?react";
// @ts-ignore
import square from "../../../../public/square.svg?react";
// @ts-ignore
import star from "../../../../public/star.svg?react";
// @ts-ignore
import upload from "../../../../public/upload.svg?react";
// @ts-ignore
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
