interface BtnSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled: boolean
}
export default function BtnSubmit({ disabled, ...props }: BtnSubmitProps) {
  return (
    <button
      className="bg-red-100 hover:bg-red-200 active:bg-red-300 transition-colors duration-300 ease-in-out text-primary outline-none border-[1px] border-red-300 rounded-lg p-1 disabled:opacity-50 disabled:bg-red-100 font-bold"
      type="submit"
      disabled={disabled}
      title="Click to submit the form"
      {...props}
    >
      Submit
    </button>
  )
}
