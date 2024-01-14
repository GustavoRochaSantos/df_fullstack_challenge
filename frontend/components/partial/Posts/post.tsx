import { Avatar } from "@/components";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import React from "react";

interface Params {
  data: {
    userId: string;
    userAvatar?: string;
    userName: string;
    userFullName: string;
    createdAt: string;
    text: string | React.ReactNode;
  };
}

const PostSection = ({ data }: Params) => {
  return (
    <div id="post" className="flex gap-2 py-4">
      <div>
        <Avatar src={data.userAvatar} />
      </div>
      <div className="flex flex-col max-w-[500px]">
        <div id="post-details" className="flex items-center gap-3">
          <span className="font-bold">{data.userFullName}</span>
          <span>
            <SealCheck size={18} />
          </span>
          <span className="text-gray-500">@{data.userName}</span>
          <span>{data.createdAt && ` - ${data.createdAt}`}</span>
        </div>
        <div id="post-message" className="">
          {data.text}
        </div>
      </div>
    </div>
  );
};

export default PostSection;
