"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Props = {
  className?: string;
  size?: number;
};

const Avatar = ({ className, size = 16 }: Props) => {
  const { data: session } = useSession();

  return (
    <Image
      src={session?.user?.image || ""}
      alt=""
      width={size}
      height={size}
      className={className}
    />
  );
};

export default Avatar;
