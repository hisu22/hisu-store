"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        alert("Bạn chưa đăng nhập");
        window.location.href = "/dang-nhap";
        return;
      }

      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Bạn không có quyền admin");
        window.location.href = "/";
        return;
      }

      const userData = querySnapshot.docs[0].data();

      if (userData.role !== "admin") {
        alert("Bạn không có quyền admin");
        window.location.href = "/";
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return <div className="p-10">Đang kiểm tra quyền admin...</div>;
  }

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-[#f6f3ee]">
      <div className="mx-auto flex max-w-7xl gap-6 p-6">
        <div className="flex-1">
          {children}
        </div>

        <aside className="h-fit w-64 rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Quản trị</h2>

          <div className="space-y-3">
            <Link href="/admin" className="block rounded-lg px-4 py-3 hover:bg-gray-100">
              Thống kê
            </Link>

            <Link href="/admin/san-pham" className="block rounded-lg px-4 py-3 hover:bg-gray-100">
              Quản lý sản phẩm
            </Link>

            <Link href="/admin/don-hang" className="block rounded-lg px-4 py-3 hover:bg-gray-100">
              Quản lý đơn hàng
            </Link>

            <Link href="/admin/nguoi-dung" className="block rounded-lg px-4 py-3 hover:bg-gray-100">
              Quản lý người dùng
            </Link>

            <Link href="/" className="block rounded-lg px-4 py-3 hover:bg-gray-100">
              ← Về trang chủ
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}