import { MainPage } from "@/pages";
import type { ReactNode } from "react";

interface IRoutes {
    path: string,
    page: ReactNode,
}

export const clientRoutesList: IRoutes[] = [
    {
        path: '/',
        page: <MainPage />
    },
    {
        path: '/login',
        page: <></>
    },
]