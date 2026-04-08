"use client";

import { useState } from "react";
import Link from "next/link";
import { auth } from "../../lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function QuenMatKhauPage() {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      if (!email.trim()) {
        alert("Vui lòng nhập email");
        return;
      }

      await sendPasswordResetEmail(auth, email);
      alert("Đã gửi email đặt lại mật khẩu");
    } catch (error) {
      alert("Không gửi được email đặt lại mật khẩu");
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f3ee] p-6">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Quên mật khẩu</h1>
          <Link href="/dang-nhap" className="rounded border px-3 py-2">
            ← Đăng nhập
          </Link>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email tài khoản"
          className="mb-4 w-full rounded-lg border p-3"
        />

        <button
          onClick={handleResetPassword}
          className="w-full rounded-lg bg-black py-3 text-white"
        >
          Gửi email đặt lại mật khẩu
        </button>
      </div>
    </main>
  );
}