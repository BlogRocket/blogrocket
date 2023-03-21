import { useUser } from "@/lib/auth";

const POSTS = [];

export function Dashboard() {
  const user = useUser();

  const username = user?.data?.username || user?.data?.email?.split("@")[0] || 'There'

  return (
    <div className="py-10">
      <h3>Hi<br /><span className="font-bold text-3xl">{username} 👋🏽</span></h3>
      {POSTS.length > 0 ? (
        <div />
      ) : (
        <div className="mt-10">
          <h3 className="text-2xl font-bold">You have no posts yet</h3>
          <p className="mt-4 text-neutral-500">Create your first post by clicking the button below</p>
          <div className="mt-8">
            <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md">
              Create post
            </button>
          </div>
        </div>
      )}
    </div >
  )
}