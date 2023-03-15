import { NavLink } from "react-router-dom"
import cn from 'clsx';

const LINKS = [
  { path: "", label: "Dashboard" },
  { path: "posts", label: "Posts" },
  { path: "access", label: "Manage access" },
]

const Sidebar: React.FC = () => {
  return (
    <aside className="h-full pb-10 px-8 overflow-y-auto border-r border-black-100">
      <div className="mt-8">
        <span className="text-2xl font-bold">
          Blogrocket <span className="text-gray-400 font-normal text-sm">v1.0</span>
        </span>
      </div>
      <div className="mt-16 flex flex-col gap-4">
        {LINKS.map((link) => (
          <NavLink key={link.path} to={link.path} className="text-black-500" end>
            {({ isActive, isPending }: any) => {
              const className = cn(
                "font-medium text-lg flex items-center gap-2 hover:bg-black-100/30",
                "rounded-md px-4 py-2",
                {
                  "bg-black-100/70 hover:bg-black-100/70": isActive || isPending,
                }
              )
              return (
                <div className={className}>
                  <span>{link.label}</span>
                </div>
              )
            }}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar