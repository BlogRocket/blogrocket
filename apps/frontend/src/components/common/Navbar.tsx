import { NavLink } from "react-router-dom";
import cn from "clsx";

type NavbarProps = {
  sticky?: boolean;
  links?: { to: string; label: string }[]
  links2?: { to: string; label: string }[]
}

const Navbar: React.FC<NavbarProps> = ({ links, links2, sticky=false }) => {
  const className = cn(
    "top-0 z-50 w-full",
    // "bg-white/60 backdrop-filter backdrop-blur-sm",
    { "sticky": sticky }
  )
  return (
    <nav className={className}>
      <div className="max-w-8xl mx-auto py-4 px-4 sm:px-6 lg:px-8 h-full flex flex-wrap gap-4 items-center justify-between">
        <NavLink className="text-2xl font-bold text-black hover:text-black" to="/">
          Blogrocket <span className="text-black-500 hover:text-black-500 font-normal text-sm">v1.0</span>
        </NavLink>
        {links2 && (
          <div className="flex items-center gap-7">
            {links2.map((link) => (
              <NavLink key={link.to} to={link.to} className="text-black-500" end>
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
        {links && (
          <div className="flex items-center gap-7">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className="text-black-500" end>
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar