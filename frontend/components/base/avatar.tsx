import Image from "next/image";
import React from "react";

interface Params {
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const Avatar = ({
  src = "/avatar.jpeg",
  width = 50,
  height = 50,
  alt = "Avatar",
}: Params) => {
  return (
    <Image
      src={src}
      width={50}
      height={50}
      alt={alt}
      className="rounded-full h-[50px]"
    />
  );
};

export default Avatar;
