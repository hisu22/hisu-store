"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function DonHangPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const vnd = (price) => Number(price || 0).toLocaleString("vi-VN") + "đ";

  const getShortId = (id) => String(id || "").slice(0, 6).toUpperCase();

  const getStatusLabel = (status) => {
    switch (status) {
      case "cho-xac-nhan":
        return "Chờ xác nhận";
      case "da-xac-nhan":
        return "Đã xác nhận";
      case "da-huy":
        return "Đã hủy";
      default:
        return status || "Không rõ";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "da-xac-nhan":
        return "bg-green-100 text-green-700";
      case "da-huy":
        return "bg-red-100 text-red-600";
      case "cho-xac-nhan":
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getPaymentLabel = (paymentMethod) => {
    return paymentMethod === "tien-mat" ? "Tiền mặt" : "Chuyển khoản";
  };

  const getPaymentClass = (paymentMethod) => {
    return paymentMethod === "tien-mat"
      ? "bg-gray-100 text-gray-700"
      : "bg-blue-100 text-blue-700";
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Bạn cần đăng nhập");
        window.location.href = "/dang-nhap";
        return;
      }

      const q = query(collection(db, "orders"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrders(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);
  
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] px-4 py-8 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm md:p-8">
            <p className="text-base text-gray-600">Đang tải đơn hàng...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] px-4 py-8 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-[28px] border border-black/5 bg-white p-6 shadow-sm md:mb-8 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-wide text-gray-500">
                Tài khoản
              </p>
              <h1 className="text-3xl font-bold text-black md:text-4xl">
                Đơn hàng của tôi
              </h1>
              <p className="mt-2 text-sm text-gray-500 md:text-base">
                Theo dõi các đơn hàng bạn đã đặt tại cửa hàng
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex w-fit items-center justify-center rounded-2xl border border-black px-4 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white"
            >
              ← Về trang chủ
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[28px] border border-black/5 bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-semibold text-black">
              Bạn chưa có đơn hàng nào
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Hãy quay lại cửa hàng để chọn sản phẩm bạn thích
            </p>

            <Link
              href="/"
              className="mt-5 inline-flex rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {currentOrders.map((order) => (
              <div
                key={order.id}
                className="overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm"
              >
                <div className="border-b border-gray-100 px-5 py-4 md:px-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Mã đơn hàng</p>
                      <h2 className="mt-1 text-xl font-bold text-black">
                        #{getShortId(order.id)}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getPaymentClass(
                          order.paymentMethod
                        )}`}
                      >
                        {getPaymentLabel(order.paymentMethod)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 px-5 py-5 md:grid-cols-[1.1fr_0.9fr] md:px-6">
                  <div>
                    <h3 className="mb-3 text-base font-semibold text-black">
                      Sản phẩm đã đặt
                    </h3>

                    <div className="space-y-3">
                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start justify-between gap-4 rounded-2xl bg-[#f8f8f8] px-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="line-clamp-2 font-medium text-black">
                              {item.name}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Số lượng: {item.quantity}
                            </p>
                          </div>

                          <p className="shrink-0 text-sm font-semibold text-black">
                            {vnd(item.price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-base font-semibold text-black">
                      Thông tin đơn hàng
                    </h3>

                    <div className="rounded-2xl bg-[#f8f8f8] p-4">
                      <div className="space-y-3 text-sm md:text-[15px]">
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-gray-500">Địa chỉ nhận</span>
                          <span className="max-w-[65%] text-right font-medium text-black">
                            {order.address || "Chưa có địa chỉ"}
                          </span>
                        </div>

                        <div className="flex items-start justify-between gap-3">
                          <span className="text-gray-500">Thanh toán</span>
                          <span className="text-right font-medium text-black">
                            {getPaymentLabel(order.paymentMethod)}
                          </span>
                        </div>

                        <div className="flex items-start justify-between gap-3">
                          <span className="text-gray-500">Số sản phẩm</span>
                          <span className="text-right font-medium text-black">
                            {order.items?.reduce(
                              (sum, item) => sum + Number(item.quantity || 0),
                              0
                            ) || 0}
                          </span>
                        </div>

                        <div className="h-px bg-gray-200" />

                        <div className="flex items-start justify-between gap-3">
                          <span className="text-gray-500">Tổng tiền</span>
                          <span className="text-right text-lg font-bold text-black">
                            {vnd(order.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="rounded-lg border px-3 py-1 text-sm hover:bg-black hover:text-white"
                  >
                    ←
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`rounded-lg px-3 py-1 text-sm ${
                        currentPage === i + 1
                          ? "bg-black text-white"
                          : "border hover:bg-black hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="rounded-lg border px-3 py-1 text-sm hover:bg-black hover:text-white"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          )}
      </div>
    </main>
  );
}