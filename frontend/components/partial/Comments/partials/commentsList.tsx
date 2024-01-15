import {
  CommentSection,
  Loading,
  NewCommentSection,
  PostSection,
} from "@/components";
import { PostCommentService } from "@/service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Params {
  postId: string;
}

const CommentsList = ({ postId }: Params) => {
  const { data, isLoading } = useQuery({
    queryKey: ["post-comments"],
    queryFn: () => PostCommentService.findAll(`postId=${postId}`),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {data?.data?.map((comment) => (
        <CommentSection key={comment.id} data={comment} />
      ))}
      <NewCommentSection postId={postId} />
    </div>
  );
};

export default CommentsList;
