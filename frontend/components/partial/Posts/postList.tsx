import { PostService } from "@/service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostSection from "./post";
import { Loading } from "@/components";

interface Params {}

const PostList = ({}: Params) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: PostService.findAll,
    // refetchInterval: 3000,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="posts">
      {data?.data?.map((post) => <PostSection key={post.id} data={post} />)}
    </div>
  );
};

export default PostList;
