import Spinner from "@/components/ui/Spinner"
import useForm from "@/hooks/useForm"
import { useNavigate } from "react-router-dom"
import { CreatePostDTO, useCreatePost } from "../api"
import { PostHeader } from "../components"

type NewPostProps = {}

export const NewPost: React.FC<NewPostProps> = () => {
  const createPost = useCreatePost()
  const navigate = useNavigate()
  const { values, onChange, onTextChange } = useForm<CreatePostDTO>();

  const save = async () => {
    const data = await createPost.mutateAsync(values)
    console.log(data)
    navigate(`/app/post/${data._id}`)
  }

  return (
    <div>
      <PostHeader title="New Post" onSave={save} />
      <div className="flex flex-col gap-4 mt-8 w-[600px] max-w-full">
        <input type="text" placeholder="Title" className="w-full bg-transparent border-b border-neutral-200 focus:border-neutral-200 py-2 px-4 focus:outline-none leading-10 text-2xl font-bold pb-4" name="title" onChange={onChange} />
        <textarea className="w-full h-96 bg-transparent focus:outline-none rounded-md py-2 px-4" placeholder="Body" name="body" onChange={(e) => onTextChange(e.target.value, 'body')} />
      </div>
      {/* Overlay */}
      {createPost.isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Spinner light />
        </div>
      )}
    </div>
  )
}