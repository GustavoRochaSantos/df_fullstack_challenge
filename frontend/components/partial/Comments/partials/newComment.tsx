"use client";
import { Avatar, Button, TextArea } from "@/components";
import { PostCommentService, PostService } from "@/service";
import { PostComment } from "@/service/postComment";
import { useUserStore } from "@/store";
import useModalStore from "@/store/modals";
import { queryClient } from "@/util/Providers";
import {
  CalendarBlank,
  Gif,
  Image,
  ListDashes,
  MapPin,
  Smiley,
} from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface Params {
  postId: string;
  id?: string;
  text?: string;
  setIsEditing?: (value: boolean) => void;
}

const NewCommentSection = (data: Params) => {
  const [text, setText] = useState(data.text || "");

  const modal = useModalStore((state) => state);
  const user = useUserStore((state) => state);

  const invalidateCache = () => {
    setText("");
    if (data.setIsEditing) {
      data.setIsEditing(false);
    }

    queryClient.invalidateQueries({
      queryKey: ["posts", "post-comments"],
    });
  };

  const { mutate: CreateMutation, isPending: createIsLoading } = useMutation({
    mutationFn: PostCommentService.create,
    onSuccess: invalidateCache,
    retry: true,
  });

  const { mutate: UpdateMutation, isPending: updateIsLoading } = useMutation({
    mutationFn: (payload: PostComment) =>
      PostCommentService.update(payload.postId, payload),
    onSuccess: invalidateCache,
    retry: true,
    onError: (error) => {
      console.log("===>", error);
    },
  });

  const handleSubmit = () => {
    if (!data?.id) {
      CreateMutation({
        text,
        postId: data.postId,
      });
    } else {
      UpdateMutation({
        postId: data.postId,
        id: data.id,
        text,
      });
    }
  };

  const handleClose = () => {
    modal.toggle("post-comment");
  };

  return (
    <div id="new-post-wrapper" className="min-w-[500px]">
      <div className="flex gap-3 mb-3">
        <div>
          <Avatar src={user.photo} />
        </div>
        <TextArea
          id="new-post"
          placeholder="Postar sua resposta"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div id="actions" className="flex justify-between">
        <div id="icons" className="flex p-4 gap-2">
          <Image size={18} className="text-blue-400" />
          <Gif size={18} className="text-blue-400" />
          <ListDashes size={18} className="text-blue-400" />
          <Smiley size={18} className="text-blue-400" />
          <CalendarBlank size={18} className="text-blue-400" />
          <MapPin size={18} className="text-blue-400" />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            loading={createIsLoading || updateIsLoading}
          >
            Postar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewCommentSection;
