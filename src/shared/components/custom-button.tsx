import type { ReactNode } from "react";

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    bg?: string;
    text: ReactNode;
    isLoading?: boolean;
}

export const CustomButton = ({
    text,
    isLoading,
    style,
    type = "button",
    bg = "#25ab6c",
    className = "",
    ...props
}: Props) => {
    return (
        <button
            type={type}
            style={{ background: bg, ...style }}
            className={`w-full text-white font-bold py-1 px-4 rounded-lg transition text-[14px] flex justify-center items-center
                  hover:brightness-105 active:scale-99 active:brightness-99 cursor-pointer ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width={32} height={20}>
                    <circle fill="#ffffff" stroke="#ffffff" strokeWidth="20" r="20" cx="40" cy="65">
                        <animate
                            attributeName="cy"
                            calcMode="spline"
                            dur="2s"
                            values="65;135;65"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-.4s"
                        />
                    </circle>
                    <circle fill="#ffffff" stroke="#ffffff" strokeWidth="20" r="20" cx="120" cy="65">
                        <animate
                            attributeName="cy"
                            calcMode="spline"
                            dur="2s"
                            values="65;135;65"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="-.2s"
                        />
                    </circle>
                    <circle fill="#ffffff" stroke="#ffffff" strokeWidth="20" r="20" cx="200" cy="65">
                        <animate
                            attributeName="cy"
                            calcMode="spline"
                            dur="2s"
                            values="65;135;65"
                            keySplines=".5 0 .5 1;.5 0 .5 1"
                            repeatCount="indefinite"
                            begin="0s"
                        />
                    </circle>
                </svg>
            ) : (
                text
            )}
        </button>
    );
};
