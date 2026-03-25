"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";

export default function GioHangPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const increaseQty = (id) => {
    const newCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decreaseQty = (id) => {
    const newCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    updateCart(newCart);
  };

  const removeItem = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    updateCart(newCart);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
          <div className="text-sm font-semibold text-rose-500">Mua sắm</div>
          <h1 className="mt-2 text-3xl font-extrabold">Giỏ hàng</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="mt-8 rounded-3xl border p-8 text-center text-slate-500">
            Giỏ hàng của bạn đang trống.
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-3xl border p-4"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-28 w-28 rounded-2xl object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="text-lg font-bold">{item.name}</div>
                      <div className="mt-1 text-sm text-slate-500">
                        {vnd(item.price)}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="rounded-full border px-3 py-1 font-bold"
                      >
                        -
                      </button>

                      <span className="font-bold">{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="rounded-full border px-3 py-1 font-bold"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 rounded-full border px-4 py-1 text-sm hover:bg-slate-50"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-3xl border p-6">
              <h2 className="text-xl font-extrabold">Tóm tắt đơn hàng</h2>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{vnd(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between border-t pt-4 text-lg font-extrabold">
                <span>Tổng cộng</span>
                <span>{vnd(total)}</span>
              </div>

              <button className="mt-6 w-full rounded-xl bg-black px-4 py-3 font-semibold text-white hover:bg-slate-800">
                Tiến hành đặt hàng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}