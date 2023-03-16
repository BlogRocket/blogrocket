
type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label: string;
  onChange?: (val: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, onChange, ...props }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange?.(value, e);
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-black">{label}</label>
      <input
        className="px-4 py-2 mt-2 bg-black-100 rounded-md border border-black-100"
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}

export default Input;
