import { useState } from "react";
import { BurgerMenuIcon, CancelIcon, cn, TruckIcon } from "@/shared";
import { Link } from "react-router-dom";
import { LanguageChanger } from "../change-lang";
import { useTranslation } from "react-i18next";

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="flex h-screen w-full">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-gray-800 text-white transition-all duration-300 ease-in-out overflow-hidden",
                    isOpen ? "w-[220px]" : "w-[46px]"
                )}
            >
                <div className="h-full flex flex-col p-2 mt-2">
                    <button
                        onClick={toggleSidebar}
                        className="mb-4 text-sm px-1 py-1 rounded bg-gray-600 hover:bg-gray-500 w-fit"
                    >
                        {!isOpen ? <BurgerMenuIcon /> : <CancelIcon />}
                    </button>

                    {/* Icons / Links */}
                    <nav className="flex flex-col gap-4 mt-4">
                        <Link to="/cargo">
                            <div className="flex items-center gap-2">
                                <TruckIcon />
                                {isOpen && <span>{t("sidebar.containers")}</span>}
                            </div>
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                <div
                    style={{ border: "2px solid rgba(0, 0, 0, 0.2)" }}
                    className="flex items-center p-2 bg-[white] rounded-md">
                    <LanguageChanger />
                </div>
                {children}
            </main>
        </div>
    );
}
