import { PostList } from "@/features/post";
import { useUser } from "@/lib/auth";
import { Helmet } from "react-helmet-async";

const POSTS = [];

export function Dashboard() {
  const user = useUser();

  const username = user?.data?.username || user?.data?.email?.split("@")[0] || 'There'

  return (
    <div className="py-10">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h3>Hi<br /><span className="font-bold text-3xl">{username} 👋🏽</span></h3>
      <div className="mt-8">
        <PostList />
      </div>
    </div >
  )
}