import { createPortal } from "react-dom"
import { XIcon } from "../assets";

type Props = {
    children?: React.ReactNode;
    onClose?: () => void;
    title?: string;
    isOpen?: boolean;
    width?: string;
}

export const CustomModal = ({ children, onClose, title, isOpen, width }: Props) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50"
            onClick={onClose}>
            <div
                className="bg-white pt-6 px-4 pb-2 rounded shadow-lg rounded-md relative"
                style={{ width: width ? width : "" }}
                onClick={(e) => e.stopPropagation()}>
                <button
                    className="absolute top-[4px] right-[2px] cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={onClose}>
                    <XIcon />
                </button>
                {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
                {children}
            </div>
        </div>,
        document.getElementById("modalPortal") as HTMLElement
    )
}
