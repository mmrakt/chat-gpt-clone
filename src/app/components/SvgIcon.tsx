import avatar from "../../../public/avatar.svg";
import edit from "../../../public/edit.svg";
import good from "../../../public/good.svg";
import bad from "../../../public/bad.svg";
import clipboard from "../../../public/clipboard.svg";
import cycle from "../../../public/cycle.svg";
import chatGpt from "../../../public/chat-gpt.svg";
import star from "../../../public/star.svg";
import lock from "../../../public/lock.svg";
import upload from "../../../public/upload.svg";
import externalLink from "../../../public/external-link.svg";
import keyboardShortcuts from "../../../public/keyboard-shortcuts.svg";
import sendMessage from "../../../public/send-message.svg";
import { twMerge } from "tailwind-merge";

const icons = {
  avatar,
  edit,
  good,
  bad,
  clipboard,
  cycle,
  chatGpt,
  star,
  lock,
  upload,
  externalLink,
  keyboardShortcuts,
  sendMessage,
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