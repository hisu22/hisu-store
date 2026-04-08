"use client";

import { useState } from "react";
import Link from "next/link";
import { auth, db } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function DangKyPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!username || !email || !password) {
        alert("Nhập đầy đủ thông tin");
        return;
      }

      const result = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(result.user, {
        displayName: username,
      });

      await setDoc(doc(db, "users", result.user.uid), {
        username,
        email,
        uid: result.user.uid,
        createdAt: new Date().toISOString(),
      });

      await sendEmailVerification(result.user);

      alert("Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản.");

      await signOut(auth);
      window.location.href = "/dang-nhap";
    } catch (error) {
      alert(error.message);
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
                Tạo tài khoản mới
              </h2>

              <p className="mt-4 max-w-[360px] text-base leading-7 text-black/60">
                Đăng ký để bắt đầu mua sắm, lưu đơn hàng và trải nghiệm giao
                diện hiện đại, tối giản của Hisu Store.
              </p>
            </div>

            <div className="rounded-[24px] bg-white/70 p-5 backdrop-blur">
              <p className="text-sm leading-6 text-black/60">
                Tham gia nhanh để khám phá các sản phẩm decor, đèn và hot trend
                theo phong cách gọn đẹp, dễ nhìn.
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
                Đăng ký
              </h1>

              <p className="mt-2 text-sm leading-6 text-black/55">
                Tạo tài khoản mới để sử dụng đầy đủ các chức năng.
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
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                onClick={handleRegister}
                className="w-full rounded-2xl bg-black px-5 py-3.5 text-base font-medium text-white shadow-sm transition duration-150 hover:opacity-95 active:translate-y-[1px] active:scale-[0.985]"
              >
                Đăng ký
              </button>
            </div>

            <p className="mt-5 text-sm text-black/60">
              Đã có tài khoản?{" "}
              <Link
                href="/dang-nhap"
                className="font-semibold text-black transition hover:opacity-70"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}