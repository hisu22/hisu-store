"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/app/data";

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";

export default function ChiTietSanPham({ params }) {
  const product = useMemo(
    () => products.find((item) => item.id === Number(params.id)),
    [params.id]
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <Link href="/cua-hang" className="text-sm font-semibold text-slate-600 hover:text-rose-500">
            ← Quay lại cửa hàng
          </Link>
          <div className="mt-8 text-xl font-bold">Không tìm thấy sản phẩm.</div>
        </div>
      </div>
    );
  }

  const addToCart = () => {
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

  return (
    <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/cua-hang" className="text-sm font-semibold text-slate-600 hover:text-rose-500">
          ← Quay lại cửa hàng
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border">
            <img src={product.img} alt={product.name} className="h-[500px] w-full object-cover" />
          </div>

          <div>
            <div className="text-sm font-semibold text-rose-500">Chi tiết sản phẩm</div>
            <h1 className="mt-2 text-3xl font-extrabold">{product.name}</h1>
            <div className="mt-4 text-2xl font-extrabold">{vnd(product.price)}</div>
            <p className="mt-4 text-slate-600">{product.description}</p>

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

            <div className="mt-8 flex gap-3">
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