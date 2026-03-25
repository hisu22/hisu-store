"use client";

import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Đèn ngủ Moon Light",
    price: 299000,
    img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 2,
    name: "Kệ gỗ mini",
    price: 459000,
    img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 3,
    name: "Lọ hoa gốm trắng",
    price: 189000,
    img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 4,
    name: "Tranh decor treo tường",
    price: 139000,
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 5,
    name: "Đồng hồ treo tường",
    price: 349000,
    img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 6,
    name: "Nến thơm chill",
    price: 99000,
    img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=60",
  },
];

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";

export default function CuaHangPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-rose-500">
          ← Quay về trang chủ
        </Link>

        <div className="mt-6">
          <div className="text-sm font-semibold text-rose-500">Danh mục sản phẩm</div>
          <h1 className="mt-2 text-3xl font-extrabold">Cửa hàng</h1>
          <p className="mt-2 text-sm text-slate-600">
            Khám phá các món đồ decor và nội thất nhỏ cho không gian sống của bạn.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-3xl border bg-white">
              <img src={item.img} alt={item.name} className="h-72 w-full object-cover" />
              <div className="p-4">
                <div className="text-sm font-bold">{item.name}</div>
                <div className="mt-2 text-lg font-extrabold">{vnd(item.price)}</div>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                    Thêm vào giỏ
                  </button>
                  <button className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}