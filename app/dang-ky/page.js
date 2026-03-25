"use client";

import Link from "next/link";

export default function DangKyPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-rose-500">
          ← Quay về trang chủ
        </Link>

        <div className="mt-8 grid overflow-hidden rounded-3xl border bg-white shadow-sm lg:grid-cols-2">
          <div className="hidden bg-slate-100 lg:block">
            <img
              src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1400&q=60"
              alt="Đăng ký"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-8 lg:p-10">
            <div className="mb-6">
              <div className="text-sm font-semibold text-rose-500">Tạo tài khoản mới</div>
              <h1 className="mt-2 text-3xl font-extrabold">Đăng ký</h1>
              <p className="mt-2 text-sm text-slate-600">
                Tạo tài khoản để lưu thông tin và mua sắm thuận tiện hơn.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">Họ và tên</label>
                <input
                  type="text"
                  placeholder="Nhập họ và tên"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-rose-400"
                />
              </div>

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
                Tạo tài khoản
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              Đã có tài khoản?{" "}
              <Link href="/dang-nhap" className="font-semibold text-rose-500 hover:text-rose-600">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}