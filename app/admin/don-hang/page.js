"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const data = querySnapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    }));
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateOrderStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
    fetchOrders();

    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const vnd = (price) => Number(price || 0).toLocaleString("vi-VN") + "đ";

  const shortId = (id) => {
    if (!id) return "";
    return String(id).slice(0, 6);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "da-xac-nhan":
        return "Đã xác nhận";
      case "da-huy":
        return "Đã hủy";
      case "cho-xac-nhan":
      default:
        return "Chờ xác nhận";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "da-xac-nhan":
        return "bg-green-50 text-green-700";
      case "da-huy":
        return "bg-red-50 text-red-700";
      case "cho-xac-nhan":
      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  const getPaymentLabel = (paymentMethod) => {
    return paymentMethod === "tien-mat" ? "Tiền mặt" : "Chuyển khoản";
  };


  const filteredOrders = orders.filter((order) => {
    const keyword = search.toLowerCase();

    const matchSearch =
      (order.receiverName || order.name || "").toLowerCase().includes(keyword) ||
      (order.email || "").toLowerCase().includes(keyword) ||
      (order.phone || "").toLowerCase().includes(keyword) ||
      (order.id || "").toLowerCase().includes(keyword);

    const matchPayment = paymentFilter
      ? order.paymentMethod === paymentFilter
      : true;

    const matchStatus = statusFilter ? order.status === statusFilter : true;

    return matchSearch && matchPayment && matchStatus;
  });

  return (
    <>
      <div className="space-y-5">
        <div className="rounded-[28px] bg-white px-7 py-6 shadow-sm ring-1 ring-black/5">
          <h1 className="text-[22px] font-bold tracking-tight text-black">
            Quản lý đơn hàng
          </h1>
          <p className="mt-2 text-[14px] text-gray-500">
            Quản lý danh sách đơn hàng của cửa hàng
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5">
          <div className="flex flex-col gap-4 border-b border-gray-100 px-7 py-6 xl:flex-row xl:items-center xl:justify-between">
            <h2 className="text-[20px] font-bold tracking-tight text-black">
              Danh sách đơn hàng
            </h2>

            <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-end">
              <span className="text-[14px] text-gray-500">
                Hiển thị {filteredOrders.length} / {orders.length} mục
              </span>

              <input
                type="text"
                placeholder="Tìm kiếm khách hàng, email, SĐT..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-2xl border border-gray-200 bg-[#f7f5f2] px-5 text-[14px] outline-none placeholder:text-gray-400 lg:w-[280px]"
              />

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="h-12 rounded-2xl border border-gray-200 bg-[#f7f5f2] px-4 text-[14px] text-gray-700 outline-none lg:w-[150px]"
              >
                <option value="">Thanh toán</option>
                <option value="tien-mat">Tiền mặt</option>
                <option value="chuyen-khoan">Chuyển khoản</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-12 rounded-2xl border border-gray-200 bg-[#f7f5f2] px-4 text-[14px] text-gray-700 outline-none lg:w-[150px]"
              >
                <option value="">Trạng thái</option>
                <option value="cho-xac-nhan">Chờ xác nhận</option>
                <option value="da-xac-nhan">Đã xác nhận</option>
                <option value="da-huy">Đã hủy</option>
              </select>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="px-7 py-10 text-sm text-gray-500">
              Chưa có đơn hàng nào
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="w-full">
                <div className="grid grid-cols-[0.55fr_1fr_1.45fr_0.9fr_0.9fr_0.95fr_0.85fr] gap-4 border-b border-gray-100 px-6 py-5 text-[14px] font-semibold text-gray-500">
                  <div>ID</div>
                  <div>Thông Tin</div>
                  <div>Sản phẩm</div>
                  <div>Thanh toán</div>
                  <div>Tổng tiền</div>
                  <div>Trạng thái</div>
                  <div>Thao tác</div>
                </div>

                <div>
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="grid cursor-pointer grid-cols-[0.55fr_1fr_1.45fr_0.9fr_0.9fr_0.95fr_0.85fr] gap-4 border-b border-gray-100 px-6 py-5 align-top transition hover:bg-[#faf8f5] last:border-b-0"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[13px] text-gray-500">
                          {shortId(order.id)}
                        </p>
                      </div>

                      <div className="min-w-0 space-y-1">
                        <p className="truncate text-[15px] font-semibold text-black">
                          {order.receiverName || order.name || "Khách hàng"}
                        </p>
                        <p className="truncate text-[14px] text-gray-500">
                          {order.email || "Không có email"}
                        </p>
                      </div>

                      <div className="min-w-0 space-y-2">
                        {order.items?.slice(0, 1).map((item, index) => (
                          <div
                            key={index}
                            className="rounded-2xl bg-[#f8f8f8] px-3 py-3"
                          >
                            <p className="truncate text-[14px] font-medium text-black">
                              {item.name}
                            </p>
                            <p className="mt-1 text-[13px] text-gray-500">
                              SL: {item.quantity} • {vnd(item.price)}
                            </p>
                          </div>
                        ))}

                        {order.items?.length > 1 && (
                          <p className="text-[13px] text-gray-500">
                            + {order.items.length - 1} sản phẩm nữa
                          </p>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[14px] text-black">
                          {getPaymentLabel(order.paymentMethod)}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <p className="text-[15px] font-semibold text-black">
                          {vnd(order.total)}
                        </p>
                      </div>

                      <div className="min-w-0">
                        <span
                          className={`inline-flex rounded-full px-4 py-2 text-[13px] font-medium ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div
                          className="flex flex-col gap-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(order.id, "da-xac-nhan")
                            }
                            className="rounded-2xl bg-black px-3 py-2 text-[13px] font-medium text-white transition hover:opacity-90"
                          >
                            Xác nhận
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(order.id, "da-huy")
                            }
                            className="rounded-2xl bg-red-500 px-3 py-2 text-[13px] font-medium text-white transition hover:bg-red-600"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-[28px] bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[20px] font-bold text-black">
                  Chi tiết đơn hàng
                </h3>
                <p className="mt-1 text-[13px] text-gray-500">
                  ID: {shortId(selectedOrder.id)}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-2xl bg-[#f7f5f2] px-4 py-2 text-[13px] font-medium text-black"
              >
                Đóng
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#f8f8f8] p-4">
                <p className="text-[13px] text-gray-500">Tài khoản</p>
                <p className="mt-1 text-[15px] font-semibold text-black">
                  {selectedOrder.receiverName ||
                    selectedOrder.name ||
                    "Khách hàng"}
                </p>
                <p className="mt-1 break-all text-[14px] text-gray-600">
                  {selectedOrder.email || "Không có email"}
                </p>
                <p className="mt-1 text-[14px] text-gray-600">
                  {selectedOrder.phone || "Không có SĐT"}
                </p>
              </div>

              <div className="rounded-2xl bg-[#f8f8f8] p-4">
                <p className="text-[13px] text-gray-500">Thông tin đơn</p>
                <p className="mt-1 text-[14px] text-black">
                  Thanh toán: {getPaymentLabel(selectedOrder.paymentMethod)}
                </p>
                <p className="mt-1 text-[14px] text-black">
                  Trạng thái: {getStatusLabel(selectedOrder.status)}
                </p>
                <p className="mt-1 text-[15px] font-semibold text-black">
                  Tổng tiền: {vnd(selectedOrder.total)}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-[#f8f8f8] p-4">
              <p className="text-[13px] text-gray-500">Địa chỉ</p>
              <p className="mt-1 text-[14px] text-black">
                {selectedOrder.address || "Không có địa chỉ"}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-[16px] font-semibold text-black">
                Danh sách sản phẩm
              </h4>

              <div className="mt-3 space-y-3">
                {selectedOrder.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-4 rounded-2xl bg-[#f8f8f8] px-4 py-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-medium text-black">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[13px] text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                    </div>

                    <p className="whitespace-nowrap text-[14px] font-medium text-black">
                      {vnd(item.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  handleUpdateOrderStatus(selectedOrder.id, "da-xac-nhan")
                }
                className="rounded-2xl bg-black px-5 py-3 text-[13px] font-medium text-white transition hover:opacity-90"
              >
                Xác nhận đơn
              </button>

              <button
                onClick={() =>
                  handleUpdateOrderStatus(selectedOrder.id, "da-huy")
                }
                className="rounded-2xl bg-red-500 px-5 py-3 text-[13px] font-medium text-white transition hover:bg-red-600"
              >
                Hủy đơn
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}