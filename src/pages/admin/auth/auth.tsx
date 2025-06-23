import { lazy } from "react";

const LoginForm = lazy(() => import("@/entities/auth/ui/login-form"))

export default function Auth() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <LoginForm />
        </div>
    );
}
