
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  onTextChange?: (val: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, onTextChange, onChange, ...props }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onTextChange?.(value, e);
    onChange?.(e);
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-black">{label}</label>
      <input
        className="px-4 py-2 mt-2 bg-neutral-100 rounded-md border border-neutral-100"
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

export default Input;
