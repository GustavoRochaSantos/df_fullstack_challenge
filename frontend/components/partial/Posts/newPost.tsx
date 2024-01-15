"use client";
import { Avatar, Button, TextArea } from "@/components";
import { PostService } from "@/service";
import { useUserStore } from "@/store";
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
  id?: string;
  text?: string;
  setIsEditing?: (value: boolean) => void;
}

const NewPostSection = (data: Params) => {
  const [text, setText] = useState(data.text || "");

  const user = useUserStore((state) => state);

  const invalidateCache = () => {
    setText("");
    if (data.setIsEditing) {
      data.setIsEditing(false);
    }

    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
  };
  const { mutate: CreateMutation, isPending: createIsLoading } = useMutation({
    mutationFn: PostService.create,
    onSuccess: invalidateCache,
    retry: true,
  });

  const { mutate: UpdateMutation, isPending: updateIsLoading } = useMutation({
    mutationFn: PostService.update,
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
      });
    } else {
      UpdateMutation({
        id: data.id,
        text,
      });
    }
  };

  if (!user.id) {
    return;
  }

  return (
    <div id="new-post-wrapper" className="border-b-2 border-gray-100 py-2 mb-2">
      <div className="flex gap-3 mb-3">
        <div>
          <Avatar src={user.photo} />
        </div>
        <TextArea
          id="new-post"
          placeholder="O que está acontecendo?"
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
        <Button
          onClick={handleSubmit}
          loading={createIsLoading || updateIsLoading}
        >
          Postar
        </Button>
      </div>
    </div>
  );
};

export default NewPostSection;
