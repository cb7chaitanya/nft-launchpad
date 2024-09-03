const Button = ({label, onClick}: {label: string, onClick: () => void}) => {
  return (
    <button onClick={onClick} className="bg-zinc-800 rounded-lg px-4 py-2 hover:bg-zinc-900 duration-300 font-semibold text-white">
        {label}
    </button>
  )
}

export default Button