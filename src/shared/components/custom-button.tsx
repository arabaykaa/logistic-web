
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    bg?: string
    text: string
}

export const CustomButton = ({ text, style, type = "button", bg = "#25ab6c", ...props }: Props) => {
    return (
        <button
            type={type}
            style={{ background: bg, ...style }}
            className="w-full text-white font-bold py-1 px-4 rounded-lg transition text-[14px]
                       hover:brightness-105 active:scale-99 active:brightness-99 cursor-pointer"
            {...props}
        >
            {text}
        </button>
    )
}
