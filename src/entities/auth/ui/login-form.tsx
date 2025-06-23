import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { apiRequest, CustomButton, Path, TextInput } from "@/shared";
import type { AuthRequestTypes, AuthResponseTypes } from '../model/auth';

export default function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const payload: AuthRequestTypes = {
                email: login,
                password: password
            }

            const handleAuth = await apiRequest<AuthRequestTypes, AuthResponseTypes>("POST", Path.Auth.login, payload)
            sessionStorage.setItem("token", handleAuth.token)
            navigate("/cargo")
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    return (
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
    )
}
