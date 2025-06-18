
type TableItem = {
    id: number | string;
    [key: string]: any;
};

interface ReusableTableProps {
    title: string;
    columns: { key: string; label: string }[];
    data: TableItem[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onActionClick: (item: TableItem) => void;
}

export const CustomTable = ({ columns, currentPage, data, onActionClick, onPageChange, title, totalPages }: ReusableTableProps) => {
    return (
        <div className="rounded-2xl shadow-md bg-white p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

            <div className="overflow-x-auto">
                <table className="w-full table-auto text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-4 py-2">
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-4 py-2">Действие</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 text-sm divide-y divide-gray-200">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                {columns.map((col) => (
                                    <td key={col.key} className="px-4 py-2">
                                        {item[col.key]}
                                    </td>
                                ))}
                                <td className="px-4 py-2">
                                    <button onClick={() => onActionClick(item)}>
                                        Открыть
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {/* <ChevronLeft className="w-4 h-4" /> */}{"<"}
                </button>
                <span className="text-sm text-gray-700">
                    Страница {currentPage} из {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {/* <ChevronRight className="w-4 h-4" /> */}{">"}
                </button>
            </div>
        </div>
    );
}
