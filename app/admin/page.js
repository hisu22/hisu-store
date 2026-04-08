"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminDashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const productsSnapshot = await getDocs(collection(db, "products"));
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      const usersSnapshot = await getDocs(collection(db, "users"));

      const orders = ordersSnapshot.docs.map((doc) => doc.data());

      setProductCount(productsSnapshot.size);
      setOrderCount(ordersSnapshot.size);
      setUserCount(usersSnapshot.size);
      setRevenue(
        orders
          .filter((order) => order.status === "da-xac-nhan")
          .reduce((sum, order) => sum + Number(order.total || 0), 0)
      );
    };

    fetchStats();
  }, []);

  const vnd = (price) => Number(price).toLocaleString("vi-VN") + "đ";

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Thống kê</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Tổng sản phẩm</p>
          <h2 className="mt-3 text-3xl font-bold">{productCount}</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Tổng đơn hàng</p>
          <h2 className="mt-3 text-3xl font-bold">{orderCount}</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Tổng người dùng</p>
          <h2 className="mt-3 text-3xl font-bold">{userCount}</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Doanh thu đã xác nhận</p>
          <h2 className="mt-3 text-3xl font-bold">{vnd(revenue)}</h2>
        </div>
      </div>
    </div>
  );
}