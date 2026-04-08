"use client";

import { useState } from "react";
import Link from "next/link";
import { auth, db } from "../../lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  reload,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function DangNhapPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        alert("Nhập đầy đủ thông tin");
        return;
      }

      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Không tìm thấy tên đăng nhập");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      const result = await signInWithEmailAndPassword(
        auth,
        userData.email,
        password
      );

      await reload(result.user);

      if (!result.user.emailVerified) {
        await signOut(auth);
        alert("Tài khoản chưa xác minh email. Vui lòng kiểm tra hộp thư ( thư rác).");
        return;
      }

      if (userData.role === "admin") {
        alert("Đăng nhập admin thành công");
        window.location.href = "/";
        return;
      }

      alert("Đăng nhập thành công");
      window.location.href = "/";
    } catch (error) {
      alert("Sai tên đăng nhập hoặc mật khẩu");
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f3ee] px-4 py-8 text-[#171717] md:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-black/10 bg-white shadow-sm md:grid-cols-2">
          <div className="hidden bg-[#e8dfd2] p-10 md:flex md:flex-col md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-black/45">
                Hisu Store
              </p>

              <h2 className="mt-6 text-4xl font-semibold leading-tight">
                Chào mừng bạn quay lại
              </h2>

              <p className="mt-4 max-w-[360px] text-base leading-7 text-black/60">
                Đăng nhập để tiếp tục mua sắm, xem đơn hàng và trải nghiệm giao
                diện tối giản của Hisu Store.
              </p>
            </div>

            <div className="rounded-[24px] bg-white/70 p-5 backdrop-blur">
              <p className="text-sm leading-6 text-black/60">
                Đèn decor, đồ trang trí và sản phẩm hot trend theo phong cách
                hiện đại, gọn gàng và dễ dùng.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-black/55 transition hover:text-black"
              >
                ← Về trang chủ
              </Link>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight">
                Đăng nhập
              </h1>

              <p className="mt-2 text-sm leading-6 text-black/55">
                Nhập tên đăng nhập và mật khẩu để tiếp tục.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-black/70">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#f8f6f2] px-4 py-3.5 text-base outline-none transition focus:border-black/25 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-black/70">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-black/10 bg-[#f8f6f2] px-4 py-3.5 text-base outline-none transition focus:border-black/25 focus:bg-white"
                />
              </div>

              <button
                onClick={handleLogin}
                className="w-full rounded-2xl bg-black px-5 py-3.5 text-base font-medium text-white shadow-sm transition duration-150 hover:opacity-95 active:translate-y-[1px] active:scale-[0.985]"
              >
                Đăng nhập
              </button>
            </div>

            <p className="mt-5 text-sm">
              <Link
                href="/quen-mat-khau"
                className="text-black/65 transition hover:text-black"
              >
                Quên mật khẩu?
              </Link>
            </p>

            <p className="mt-5 text-sm text-black/60">
              Chưa có tài khoản?{" "}
              <Link
                href="/dang-ky"
                className="font-semibold text-black transition hover:opacity-70"
              >
                Đăng ký
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}