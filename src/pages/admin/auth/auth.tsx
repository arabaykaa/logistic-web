import { CustomButton, TextInput } from "@/shared";
import { useState } from "react";

export default function Auth() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Логин:', login);
        console.log('Пароль:', password);
        // Здесь запрос на сервер
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-2xl p-8 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Авторизация</h2>

                <div className="mb-4">
                    <TextInput
                        required
                        label="Логин"
                        id="login"
                        type="text"
                        value={login}
                        className="bo"
                        placeholder="Введите код или логин"
                        onChange={(e) => setLogin(e.target.value)} />
                </div>

                <div className="mb-6">
                    <TextInput
                        required
                        label="Пароль"
                        id="password"
                        type="password"
                        value={password}
                        placeholder="Введите код или пароль"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <CustomButton type="submit" text="Войти" />
            </form>
        </div>
    );
}
