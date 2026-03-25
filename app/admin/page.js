"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-rose-500">
          ← Quay về trang chủ
        </Link>

        <div className="mt-6">
          <div className="text-sm font-semibold text-rose-500">Quản trị hệ thống</div>
          <h1 className="mt-2 text-3xl font-extrabold">Trang quản trị</h1>
          <p className="mt-2 text-sm text-slate-600">
            Quản lý sản phẩm, người dùng và thống kê cơ bản của website.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border p-6">
            <div className="text-sm text-slate-500">Tổng sản phẩm</div>
            <div className="mt-2 text-3xl font-extrabold">24</div>
          </div>

          <div className="rounded-3xl border p-6">
            <div className="text-sm text-slate-500">Người dùng</div>
            <div className="mt-2 text-3xl font-extrabold">128</div>
          </div>

          <div className="rounded-3xl border p-6">
            <div className="text-sm text-slate-500">Đơn hàng</div>
            <div className="mt-2 text-3xl font-extrabold">36</div>
          </div>

          <div className="rounded-3xl border p-6">
            <div className="text-sm text-slate-500">Doanh thu</div>
            <div className="mt-2 text-3xl font-extrabold">12.500.000đ</div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border p-6">
            <h2 className="text-xl font-extrabold">Quản lý sản phẩm</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-2xl border p-4">
                <span>Thêm sản phẩm mới</span>
                <button className="rounded-full bg-black px-4 py-2 text-white">Thêm</button>
              </div>
              <div className="flex items-center justify-between rounded-2xl border p-4">
                <span>Chỉnh sửa giá sản phẩm</span>
                <button className="rounded-full border px-4 py-2">Sửa</button>
              </div>
              <div className="flex items-center justify-between rounded-2xl border p-4">
                <span>Xóa sản phẩm</span>
                <button className="rounded-full border px-4 py-2">Xóa</button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border p-6">
            <h2 className="text-xl font-extrabold">Quản lý người dùng</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-2xl border p-4">Xem danh sách tài khoản</div>
              <div className="rounded-2xl border p-4">Phân quyền người dùng</div>
              <div className="rounded-2xl border p-4">Khóa / mở khóa tài khoản</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}