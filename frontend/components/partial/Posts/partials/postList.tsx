import { Loading } from "@/components";
import { PostService } from "@/service";
import { useQuery } from "@tanstack/react-query";
import PostSection from "./post";

interface Params {}

const PostList = ({}: Params) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: PostService.findAll,
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
