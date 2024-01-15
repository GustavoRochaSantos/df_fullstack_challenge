"use client";
import { Avatar, Button, NewCommentSection } from "@/components";
import { PostLikeService } from "@/service";
import { Post } from "@/service/post";
import { PostComment } from "@/service/postComment";
import { useUserStore } from "@/store";
import useModalStore from "@/store/modals";
import { queryClient } from "@/util/Providers";
import { Pen, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
interface Params {
  data: PostComment;
}

const Comment = ({ data }: Params) => {
  const userId = useUserStore((state) => state.id);
  const modal = useModalStore((state) => state);
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
      <NewCommentSection
        postId={data.postId}
        id={data.id}
        text={data?.text}
        setIsEditing={handleEdit}
      />
    );
  }

  return (
    <div id="post" className="post-wrapper gap-2 max-w-[500px]">
      <div className="relative flex w-full gap-2 py-4">
        <div>
          <Avatar src={data?.photo || undefined} />
        </div>
        <div className="flex flex-col ">
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
          <Button className="absolute -right-6" onClick={handleEdit}>
            <Pen />
          </Button>
        )}
      </div>

      {/* <Modal modalName={"post-comments"} isOpen={modal.pages["post-comments"]}>
        <CommentsList postId={data.id} />
      </Modal> */}
    </div>
  );
};

export default Comment;
