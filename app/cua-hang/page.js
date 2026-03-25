"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Đèn ngủ Moon Light",
    price: 299000,
    category: "den",
    img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 2,
    name: "Đèn bàn tối giản",
    price: 359000,
    category: "den",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 3,
    name: "Kệ gỗ mini",
    price: 459000,
    category: "ke-ban",
    img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 4,
    name: "Bàn decor nhỏ",
    price: 599000,
    category: "ke-ban",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 5,
    name: "Lọ hoa gốm trắng",
    price: 189000,
    category: "do-trang-tri",
    img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 6,
    name: "Tranh decor treo tường",
    price: 139000,
    category: "do-trang-tri",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 7,
    name: "Đồng hồ treo tường",
    price: 349000,
    category: "do-trang-tri",
    img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 8,
    name: "Nến thơm chill",
    price: 99000,
    category: "do-trang-tri",
    img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=60",
  },
];

const tabs = [
  { key: "tat-ca", label: "Tất cả sản phẩm" },
  { key: "den", label: "Đèn" },
  { key: "ke-ban", label: "Kệ & bàn" },
  { key: "do-trang-tri", label: "Đồ trang trí" },
];

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";

export default function CuaHangPage() {
  const [activeTab, setActiveTab] = useState("tat-ca");

  const filteredProducts = useMemo(() => {
    if (activeTab === "tat-ca") return products;
    return products.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-semibold text-slate-600 hover:text-rose-500"
        >
          ← Quay về trang chủ
        </Link>

        <div className="mt-6">
          <div className="text-sm font-semibold text-rose-500">Danh mục sản phẩm</div>
          <h1 className="mt-2 text-3xl font-extrabold">Tất cả sản phẩm</h1>
          <p className="mt-2 text-sm text-slate-600">
            Chọn nhóm sản phẩm để xem đúng món đồ bạn muốn.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full border px-6 py-3 text-lg font-semibold transition ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border bg-white"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-72 w-full object-cover"
              />
              <div className="p-4">
                <div className="text-sm font-bold">{item.name}</div>
                <div className="mt-2 text-lg font-extrabold">{vnd(item.price)}</div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                        const index = cart.findIndex((p) => p.id === item.id);

                        if (index !== -1) {
                            cart[index].quantity += 1;
                        } else {
                            cart.push({ ...item, quantity: 1 });
                        }

                        localStorage.setItem("cart", JSON.stringify(cart));
                        alert("Đã thêm vào giỏ hàng");
                    }}
                    className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mt-10 rounded-3xl border p-8 text-center text-slate-500">
            Không có sản phẩm nào trong mục này.
          </div>
        )}
      </div>
    </div>
  );
}