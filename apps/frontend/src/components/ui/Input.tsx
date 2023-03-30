import cn from 'clsx';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  onTextChange?: (val: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({ label, onTextChange, onChange, className, inputClassName, ...props }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onTextChange?.(value, e);
    onChange?.(e);
  }

  const classes = cn(
    "flex flex-col gap-1",
    className
  )

  const inputClasses = cn(
    "px-4 py-2 mt-2 bg-neutral-100 rounded-md border border-neutral-100",
    inputClassName
  )

  return (
    <div className={classes}>
      <label className="text-sm font-medium text-black">{label}</label>
      <input
        className={inputClasses}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

export default Input;
