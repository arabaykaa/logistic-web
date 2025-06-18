import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8 text-center">
                Страница не найдена. Возможно, она была перемещена или удалена.
            </p>
            <button
                onClick={() => navigate(-1)}
                className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
            >
                Назад
            </button>
        </div>
    );
};
