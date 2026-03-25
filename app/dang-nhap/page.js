"use client";

import Link from "next/link";

export default function DangNhapPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-rose-500">
          ← Quay về trang chủ
        </Link>

        <div className="mt-8 grid overflow-hidden rounded-3xl border bg-white shadow-sm lg:grid-cols-2">
          <div className="hidden bg-slate-100 lg:block">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=60"
              alt="Đăng nhập"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-8 lg:p-10">
            <div className="mb-6">
              <div className="text-sm font-semibold text-rose-500">Chào mừng trở lại</div>
              <h1 className="mt-2 text-3xl font-extrabold">Đăng nhập</h1>
              <p className="mt-2 text-sm text-slate-600">
                Đăng nhập để tiếp tục mua sắm và quản lý tài khoản của bạn.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Mật khẩu</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-rose-400"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-black px-4 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Đăng nhập
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              Chưa có tài khoản?{" "}
              <Link href="/dang-ky" className="font-semibold text-rose-500 hover:text-rose-600">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}