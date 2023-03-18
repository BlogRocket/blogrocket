import { NavLink } from "react-router-dom"
import cn from 'clsx';

const LINKS = [
  { path: "", label: "Dashboard" },
  { path: "posts", label: "Posts" },
  { path: "access", label: "Manage access" },
]

const Sidebar: React.FC = () => {
  return (
    <aside className="h-full flex flex-col pb-10 px-8 overflow-y-auto border-r bg-neutral-900 border-neutral-100">
      <div className="mt-8">
        <NavLink className="text-2xl font-bold text-neutral-200 hover:text-neutral-200" to="/">
          Blogrocket <span className="text-neutral-500 hover:text-neutral-500 font-normal text-sm">v1.0</span>
        </NavLink>
      </div>
      <div className="mt-16 flex flex-col gap-4">
        {LINKS.map((link) => (
          <NavLink key={link.path} to={link.path} className="text-neutral-500" end>
            {({ isActive, isPending }: any) => {
              const className = cn(
                "font-medium text-base flex items-center gap-2 hover:bg-neutral-800/40",
                "rounded-md px-4 py-2 hover:text-neutral-100",
                {
                  "bg-neutral-800/70 hover:bg-neutral-800/70 text-neutral-100": isActive || isPending,
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
      <div className="mt-auto">
        <span className="text-neutral-500 cursor-pointer">
          <div className="font-medium text-base flex items-center gap-2 hover:bg-neutral-100/40 rounded-md px-4 py-2">
            <span>Logout</span>
          </div>
        </span>
      </div>
    </aside>
  )
}

export default Sidebar