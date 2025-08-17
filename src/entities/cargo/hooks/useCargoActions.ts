import { useCallback, useEffect, useState } from "react";
import type { CargoResponseTypeForTable } from "../model";
import type { TableItem } from "@/shared/components/custom-table";
import { apiRequest, Path } from "@/shared";

const LIMIT = 10;

export function useCargoTable() {
  const [filter, setFilter] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState<TableItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await apiRequest<void, CargoResponseTypeForTable>(
        "GET",
        Path.Containers.getAll({ page: page, limit: LIMIT })
      );
      const mappedData = response.data.map((item) => ({
        ...item,
        id: item._id,
      }));
      setData(mappedData);
      setTotalPages(response.totalPages);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Ошибка при загрузке данных");
    }
  }, [page, filter]);

  useEffect(() => {
    fetchData();
  }, [page, filter]);

  const handleDelete = async (id: string | number) => {
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить этот контейнер?"
    );
    if (!confirmed) return;
    try {
      await apiRequest("DELETE", Path.Containers.delete(id));
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Ошибка при удалении");
    }
  };

  return {
    data,
    page,
    setPage,
    totalPages,
    error,
    filter,
    setFilter,
    handleDelete,
  };
}
