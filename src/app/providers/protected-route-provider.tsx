import { useEffect } from "react";
import { SidebarLayout } from "@/widgets/sidebar-layout/sidebar-layout";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const ProtectedRouteProvider = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token])

    if (!token) return null

    return (
        <SidebarLayout>
            <Outlet />
        </SidebarLayout>
    );
}
