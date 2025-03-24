interface InputProps {
  name: string
  placeholder: string
  textarea?: boolean
  type?: string
  required?: boolean
}
export default function Input({
  name,
  placeholder,
  type = 'text',
  textarea = false,
  required = false,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-primary" htmlFor={name}>
        {name.split('')[0].toUpperCase()}
        {name.slice(1, name.length)}
        {required && '*'}
      </label>
      {textarea ? (
        <textarea
          className="bg-transparent text-black outline-none border-[1px] border-red-300 rounded-lg p-2"
          name={name}
          id={name}
          placeholder={placeholder}
          required={required}
        />
      ) : (
        <input
          required={required}
          className="bg-transparent text-black outline-none border-[1px] border-red-300 rounded-lg p-2"
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}
