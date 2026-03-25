"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { defaultProducts } from "@/app/du-lieu-san-pham";

const tabs = [
  { key: "tat-ca", label: "Tất cả sản phẩm" },
  { key: "den", label: "Đèn" },
  { key: "ke-ban", label: "Kệ & bàn" },
  { key: "do-trang-tri", label: "Đồ trang trí" },
];

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";

export default function CuaHangPage() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("tat-ca");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("admin_products") || "[]");

    if (saved.length > 0) {
      setProducts(saved);
    } else {
      localStorage.setItem("admin_products", JSON.stringify(defaultProducts));
      setProducts(defaultProducts);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeTab === "tat-ca") return products;
    return products.filter((item) => item.category === activeTab);
  }, [activeTab, products]);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((p) => p.id === item.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng");
  };

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
                    ? "border-black bg-black text-white"
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

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Thêm vào giỏ
                  </button>

                  <Link
                    href={`/san-pham/${item.id}`}
                    className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    Xem chi tiết
                  </Link>
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