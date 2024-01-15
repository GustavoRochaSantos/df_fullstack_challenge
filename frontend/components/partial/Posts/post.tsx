"use client";
import { Avatar, Button, NewPostSection } from "@/components";
import { Post } from "@/service/post";
import { useUserStore } from "@/store";
import {
  ArrowsClockwise,
  BookmarkSimple,
  ChartLine,
  Chat,
  Heart,
  Pen,
  SealCheck,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import LikeMutations from "@/mutation/postLike";
import { useMutation } from "@tanstack/react-query";
import { PostLikeService } from "@/service";
import { queryClient } from "@/util/Providers";
import InfoIcon from "./components/infoIcon";
interface Params {
  data: Post;
}

const PostSection = ({ data }: Params) => {
  const userId = useUserStore((state) => state.id);
  const [isEditing, setIsEditing] = useState(false);

  const invalidPostCache = () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
  };
  const { mutate: likeMutation } = useMutation({
    mutationFn: PostLikeService.create,
    onSuccess: invalidPostCache,
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (isEditing) {
    return (
      <NewPostSection
        id={data.id}
        text={data?.text}
        setIsEditing={handleEdit}
      />
    );
  }

  const handleLike = (postId: string | undefined) => {
    if (postId) likeMutation(postId);
  };

  return (
    <div id="post" className="post-wrapper">
      <div className="relative flex w-full gap-2 py-4">
        <div>
          <Avatar src={data?.photo || undefined} />
        </div>
        <div className="flex flex-col max-w-[500px]">
          <div id="post-details" className="flex items-center gap-3">
            <span className="font-bold">{data?.User?.fullName}</span>
            <span>
              <SealCheck size={18} />
            </span>
            <span className="text-gray-500">{data?.User?.name}</span>
            <span>{data.createdAt && ` ${data?.createdAt}`}</span>
          </div>
          <div id="post-message" className="">
            {data.text}
          </div>
        </div>
        {userId === data.userId && (
          <Button className="absolute right-0" onClick={handleEdit}>
            <Pen />
          </Button>
        )}
      </div>
      <div className="flex justify-between">
        <InfoIcon icon={<Chat size={16} />} text={data.comments} />
        <InfoIcon icon={<ArrowsClockwise size={16} />} text={data.reposts} />
        <InfoIcon
          icon={<Heart size={16} />}
          text={data.likes}
          handleClick={() => handleLike(data.id)}
        />
        <InfoIcon icon={<ChartLine size={16} />} text={data.views} />
        <InfoIcon icon={<BookmarkSimple size={16} />} />
        <InfoIcon icon={<ShareNetwork size={16} />} />
      </div>
    </div>
  );
};

export default PostSection;
