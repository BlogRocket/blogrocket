import cn from 'clsx';
import { NavLink } from 'react-router-dom';
import Spinner from '@/components/ui/Spinner';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'outline' | 'solid';
  to?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant='solid', loading, disabled, className, ...props }) => {
  const Component = props.to ? NavLink : "button"
  const cls = cn(
    'px-4 py-2 rounded-md text-white font-medium relative',
    {
      'bg-neutral-800 hover:bg-neutral-900 hover:text-white': variant === 'solid',
      'bg-transparent hover:bg-neutral-800 text-neutral-800 hover:text-white': variant === 'outline',
      'opacity-50 cursor-not-allowed': disabled
    },
    className
  )
  return (
    <Component type="button" className={cls} {...props}>
      {children}
      {loading && <div className="absolute inset-0 bg-neutral-900/50"><Spinner /></div>}
    </Component>
  )
}

export default Button
