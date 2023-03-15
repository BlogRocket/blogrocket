
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-black">{label}</label>
      <input className="px-4 py-2 mt-2 bg-black-100 rounded-md border border-black-100" {...props} />
    </div>
  )
}

export default Input;
