import { useNavigate } from "react-router-dom"

export default function RouteBackButton() {
    const navigate = useNavigate()
    return (
        <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-white py-1 px-4 rounded-lg transition text-[12px] mb-2
                       hover:brightness-105 active:scale-99 active:brightness-99 cursor-pointer">
            Назад
        </button>
    )
}
