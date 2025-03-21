interface BtnSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean
  title: string
}
export default function BtnSubmit({
  disabled,
  title,
  ...props
}: BtnSubmitProps) {
  return (
    <button
      className="bg-red-100 hover:bg-red-200 active:bg-red-300 transition-colors duration-300 ease-in-out text-primary outline-none border-[1px] border-red-300 rounded-lg  disabled:opacity-50 disabled:bg-red-100 font-bold py-2 px-4 self-start"
      type="submit"
      disabled={disabled}
      title={title}
      {...props}
    >
      {title}
    </button>
  )
}
