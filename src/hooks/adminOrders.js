import { useCallback, useEffect, useState } from "react";
import { getOrders } from "../services/admin";

export const useAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const refreshOrders = useCallback(async (page) => {
    const res = await getOrders(page);
    if (res?.success) {
      setOrders(res.orders || []);
      setPagination(res.pagination || {});
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await refreshOrders(currentPage);
    };
    fetchData();
  }, [currentPage, refreshOrders]);

  return { orders, pagination, currentPage, setCurrentPage, refreshOrders };
};
