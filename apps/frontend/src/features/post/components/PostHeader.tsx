import Button from "@/components/ui/Button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Post } from "../types";

type PostHeaderProps = {
  title?: string;
  onSave?: () => void;
}

export const PostHeader = ({ title = "", onSave }: PostHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center gap-4 py-8 w-[600px] max-w-full">
      <ArrowLeftIcon className="w-5 h-5 text-gray-400 mr-2 cursor-pointer" onClick={() => navigate(-1)} />
      <h1 className="text-xl font-bold">
        {title}
      </h1>
      <div className="ml-auto">
        {onSave && <Button onClick={onSave}>Save</Button>}
      </div>
    </header>
  )
}