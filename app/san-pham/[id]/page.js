"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { defaultProducts } from "@/app/du-lieu-san-pham";

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";

export default function ChiTietSanPham({ params }) {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("admin_products") || "[]");

    if (saved.length > 0) {
      setProducts(saved);
    } else {
      localStorage.setItem("admin_products", JSON.stringify(defaultProducts));
      setProducts(defaultProducts);
    }
  }, []);

  const product = useMemo(() => {
    return products.find((item) => item.id === Number(params.id));
  }, [products, params.id]);

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng");
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
        <div className="mx-auto max-w-6xl">
          <div className="text-sm text-slate-500">Đang tải sản phẩm...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/cua-hang"
            className="text-sm font-semibold text-slate-600 hover:text-rose-500"
          >
            ← Quay lại cửa hàng
          </Link>
          <div className="mt-8 text-xl font-bold">Không tìm thấy sản phẩm.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/cua-hang"
          className="text-sm font-semibold text-slate-600 hover:text-rose-500"
        >
          ← Quay lại cửa hàng
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border">
            <img
              src={product.img}
              alt={product.name}
              className="h-[500px] w-full object-cover"
            />
          </div>

          <div>
            <div className="text-sm font-semibold text-rose-500">
              Chi tiết sản phẩm
            </div>
            <h1 className="mt-2 text-3xl font-extrabold">{product.name}</h1>
            <div className="mt-4 text-2xl font-extrabold">
              {vnd(product.price)}
            </div>
            <p className="mt-4 text-slate-600">
              {product.description || "Chưa có mô tả cho sản phẩm này."}
            </p>

            <div className="mt-6">
              <div className="mb-2 text-sm font-semibold">Số lượng</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                  className="rounded-full border px-4 py-2 font-bold"
                >
                  -
                </button>

                <span className="text-lg font-bold">{quantity}</span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="rounded-full border px-4 py-2 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={addToCart}
                className="rounded-full bg-black px-6 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Thêm vào giỏ hàng
              </button>

              <Link
                href="/gio-hang"
                className="rounded-full border px-6 py-3 font-semibold hover:bg-slate-50"
              >
                Xem giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}