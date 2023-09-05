import Image from "next/image";
import avatar from "../../../public/avatar.svg";
import edit from "../../../public/edit.svg";
import good from "../../../public/good.svg";
import bad from "../../../public/bad.svg";
import clipboard from "../../../public/clipboard.svg";
import cycle from "../../../public/cycle.svg";

const icons = { avatar, edit, good, bad, clipboard, cycle };

type Name = keyof typeof icons;

type Props = {
  name: Name;
  size?: number;
  className?: string;
};

const DEFAULT_SIZE = 16;

export function Icon({ name, size = DEFAULT_SIZE, className }: Props) {
  const icon = icons[name];

  return (
    <Image src={icon} alt="" width={size} height={size} className={className} />
  );
}
