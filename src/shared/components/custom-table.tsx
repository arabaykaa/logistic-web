import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CustomButton } from ".";
import { ChevronLeftIcon, ChevronRightIcon, MenuDeepIcon } from "../assets";
import { useTranslation } from "react-i18next";

export type TableItem = {
    id: number | string;
    [key: string]: any;
};

interface ReusableTableProps {
    title: string;
    columns: { key: string; label: string, type?: string }[];
    data: TableItem[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onEdit: (item: TableItem) => void;
    onDelete: (id: string | number) => void;
    actionComponents?: ReactNode;
}

export default function CustomTable({
    columns,
    currentPage,
    data,
    onPageChange,
    title,
    totalPages,
    onEdit,
    onDelete,
    actionComponents,
}: ReusableTableProps) {
    const { t } = useTranslation()
    const [openRowId, setOpenRowId] = useState<string | number | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenRowId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = (id: string | number) => {
        setOpenRowId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="rounded-2xl shadow-md bg-white p-6 space-y-4">
            <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                {actionComponents ?? null}
            </div>

            <table className="w-full table-auto text-left border-collapse">
                <thead className="bg-gray-100 text-gray-600 text-sm">
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key} className="px-4 py-2">
                                {t(`form.label.${col.label}`)}
                            </th>
                        ))}
                        <th className="px-4 py-2 flex justify-end">{t("table.head.action")}</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 relative">
                            {columns.map((col) => (
                                <td key={col.key} className="px-4 py-2">
                                    {col.type === "date" ? new Date(item[col.key]).toLocaleString("ru-RU").replace(/\//g, ".").replace(",", "") : item[col.key]}
                                </td>
                            ))}
                            <td className="px-4 py-2 flex justify-end">
                                <div className="relative" ref={menuRef}>
                                    <CustomButton
                                        text={<MenuDeepIcon />}
                                        style={{ width: "fit-content", fontSize: 12, padding: 2 }}
                                        onClick={() => toggleMenu(item.id)}
                                    />
                                    {openRowId === item.id && (
                                        <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded shadow-md right-0">
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 cursor-pointer"
                                            >
                                                {t("table.buttons.edit")}
                                            </button>
                                            <button
                                                onClick={() => onDelete(item.id)}
                                                className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {t("table.buttons.delete")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end items-center gap-2 mt-4">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-6 h-6 flex items-center justify-center rounded-full transition
                ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"}`}
                >
                    <ChevronLeftIcon />
                </button>
                <span className="text-sm text-gray-700 px-2">
                    {t("table.buttons.page")} {currentPage}   {t("table.buttons.from")} {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-6 h-6 flex items-center justify-center rounded-full transition
                ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer "}`}
                >
                    <ChevronRightIcon />
                </button>
            </div>

        </div>
    );
}
