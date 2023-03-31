import { useState } from 'react';
import Spinner from '@/components/ui/Spinner';
import { humanizeTime } from '@/utils/time';
import { Pagination } from '@mui/material';
import cn from 'clsx';
import { usePosts } from '../api';
import Button from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const PostList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePosts({ page });
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="w-full h-40 flex justify-center items-center">
        <Spinner light />
      </div>
    )
  }

  if (!data || data.posts.length === 0) {
    return (
      <div>
        <h3 className="text-2xl font-bold">You have no posts yet</h3>
        <p className="mt-4 text-neutral-500">Create your first post by clicking the button below</p>
        <div className="mt-8">
          <Button to='post/new' className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md">
            Create post
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[600px] max-w-full">
      <header className="sticky top-0 py-4">
        <input type="text" autoComplete="off"
          placeholder="Search posts" className="w-full bg-white border border-neutral-300 focus:border-neutral-500 rounded-md py-2 px-4" />
      </header>
      <div className="flex flex-col space-y-4 mt-8">
        {data.posts.map((post, index) => {
          const className = cn(
            'cursor-pointer',
            {
              'w-full border-b border-neutral-100 pb-4': index !== data.posts.length - 1,
            }
          )
          return (
            <div key={post._id} className={className} onClick={() => navigate(`/app/post/${post._id}`)}>
              <h3 className="text-2xl font-medium">{post.title}</h3>
              <p className="mt-px text-neutral-500">{post.body}</p>
              <div>
                <small className="text-neutral-500">created {humanizeTime(post.createdAt)}</small>
              </div>
            </div>
          )
        })
        }
      </div>
      <div className="flex justify-center align-center mt-10 mb-20">
        <Pagination
          count={data.total}
          page={data.page}
          variant="outlined"
          shape="rounded"
          onChange={(_e, page) => setPage(page)}
        />
      </div>
    </div>
  )
}