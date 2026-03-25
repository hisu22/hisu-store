"use client";

import Link from "next/link";

const cartItems = [
  {
    id: 1,
    name: "Đèn ngủ Moon Light",
    price: 299000,
    quantity: 1,
    img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=900&q=60",
  },
  {
    id: 2,
    name: "Lọ hoa gốm trắng",
    price: 189000,
    quantity: 2,
    img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=60",
  },
];

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";

export default function GioHangPage() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-rose-500">
          ← Quay về trang chủ
        </Link>

        <div className="mt-6">
          <div className="text-sm font-semibold text-rose-500">Mua sắm</div>
          <h1 className="mt-2 text-3xl font-extrabold">Giỏ hàng</h1>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-3xl border p-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-28 w-28 rounded-2xl object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="text-lg font-bold">{item.name}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      Số lượng: {item.quantity}
                    </div>
                  </div>
                  <div className="text-lg font-extrabold">{vnd(item.price)}</div>
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
      </div>
    </div>
  );
}