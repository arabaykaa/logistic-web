import { Route, Routes } from "react-router-dom"
import { ProtectedRouteProvider } from "../providers";
import { lazy, Suspense } from "react";
import { Loading } from "@/widgets";
import { MainPage, NotFoundPage } from "@/pages";

const CargoPage = lazy(() => import("@/pages/admin/cargo/cargo"))
const CargoAddEditPage = lazy(() => import("@/pages/admin/cargo/add-edit"))
const CargoDetailPage = lazy(() => import("@/pages/admin/cargo/detail"))
const AuthPage = lazy(() => import("@/pages/admin/auth/auth"))

export const ROUTES = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route element={<ProtectedRouteProvider />}>
                <Route
                    path="/cargo"
                    element={
                        <Suspense fallback={<Loading />}>
                            <CargoPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/cargo/add-edit"
                    element={
                        <Suspense fallback={<Loading />}>
                            <CargoAddEditPage />
                        </Suspense>
                    }
                />
                <Route
                    path="/cargo/detail"
                    element={
                        <Suspense fallback={<Loading />}>
                            <CargoDetailPage />
                        </Suspense>
                    }
                />
            </Route>
            <Route
                path="/login"
                element={
                    <Suspense fallback={<Loading />}>
                        <AuthPage />
                    </Suspense>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes >
    );
}
