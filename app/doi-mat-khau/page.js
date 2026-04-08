"use client";

import { useState } from "react";
import Link from "next/link";
import { auth } from "../../lib/firebase";
import { updatePassword } from "firebase/auth";

export default function DoiMatKhauPage() {
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Bạn cần đăng nhập");
        window.location.href = "/dang-nhap";
        return;
      }

      if (!newPassword || newPassword.length < 6) {
        alert("Mật khẩu mới phải từ 6 ký tự");
        return;
      }

      await updatePassword(user, newPassword);
      alert("Đổi mật khẩu thành công");
      setNewPassword("");
    } catch (error) {
      alert("Không đổi được mật khẩu, hãy đăng nhập lại");
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f3ee] p-6">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Đổi mật khẩu</h1>
          <Link href="/" className="rounded border px-3 py-2">
            ← Về trang chủ
          </Link>
        </div>

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nhập mật khẩu mới"
          className="mb-4 w-full rounded-lg border p-3"
        />

        <button
          onClick={handleChangePassword}
          className="w-full rounded-lg bg-black py-3 text-white"
        >
          Đổi mật khẩu
        </button>
      </div>
    </main>
  );
}