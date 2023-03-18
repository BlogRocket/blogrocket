import { NavLink } from "react-router-dom"
import { RectangleGroupIcon, KeyIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import cn from 'clsx';

const LINKS = [
  { path: "", label: "Dashboard", icon: RectangleGroupIcon },
  { path: "access", label: "Manage access", icon: KeyIcon },
]

const Sidebar: React.FC = () => {
  return (
    <aside className="h-full flex flex-col pb-10 px-8 overflow-y-auto bg-neutral-900">
      <div className="mt-8">
        <NavLink className="text-2xl font-bold text-neutral-200 hover:text-neutral-200" to="/">
          Blogrocket <span className="text-neutral-500 hover:text-neutral-500 font-normal text-sm">v1.0</span>
        </NavLink>
      </div>
      <div className="mt-16 flex flex-col gap-2">
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
              const Icon = link.icon
              return (
                <div className={className}>
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </div>
              )
            }}
          </NavLink>
        ))}
      </div>
      <div className="mt-auto">
        <div className="font-medium text-base flex items-center gap-2 hover:bg-neutral-800/40 rounded-md px-4 py-2 text-neutral-500 hover:text-neutral-100 cursor-pointer">
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Log out</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar