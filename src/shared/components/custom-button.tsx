
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    bg?: string
    text: string
}

export const CustomButton = ({ text, style, type = "button", bg = "#25ab6c", ...props }: Props) => {
    return (
        <button
            type={type}
            style={{ background: bg, ...style }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
            {...props}>
            {text}
        </button >
    )
}
