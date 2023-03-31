import { useParams } from "react-router-dom"
import { usePost } from "../api"
import { PostHeader } from "../components"

type ShowPostProps = {
}

export const ShowPost: React.FC<ShowPostProps> = () => {
  // get id from url
  const id = useParams().postId || "null"
  const post = usePost(id)

  if (post.isLoading) {
    return <div>Loading...</div>
  }

  if (!post.isLoading && !post.data) {
    return <div>Post not found</div>
  }

  if (post.error) {
    return <div>Err</div>
  }

  return (
    <div>
      <PostHeader />
      <div className="flex flex-col gap-4 mt-8 w-[600px] max-w-full">
        <div className="w-full bg-transparent focus:border-neutral-200 py-2 px-4 focus:outline-none leading-10 text-2xl font-bold">
          {post.data.title}
        </div>
        <div className="w-full h-96 bg-transparent focus:outline-none rounded-md py-2 px-4" placeholder="Body">
          {post.data.body}
        </div>
      </div>
    </div>
  )
}