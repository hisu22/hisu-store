"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { db, auth } from "../../../lib/firebase";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      } catch (error) {
        console.error("Lỗi lấy chi tiết sản phẩm:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (!currentUser) {
        setIsAdmin(false);
        return;
      }

      try {
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setIsAdmin(userData.role === "admin");
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Lỗi kiểm tra quyền admin:", error);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const vnd = (price) => Number(price).toLocaleString("vi-VN") + "đ";

  if (!product) {
    return (
      <div className="p-10 text-center text-lg">Đang tải sản phẩm...</div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#171717]">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f3ee]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-semibold tracking-wide">
            Hisu Store
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="/#bo-suu-tap" className="hover:opacity-70">
              Bộ sưu tập
            </a>
            <Link href="/san-pham" className="hover:opacity-70">
              Sản phẩm
            </Link>
            <Link href="/gio-hang" className="hover:opacity-70">
              Giỏ hàng
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm"
                  >
                    {isAdmin
                      ? `Admin: ${user.displayName || user.email}`
                      : `${user.displayName || user.email}`}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
                      {!isAdmin && (
                        <Link
                          href="/don-hang"
                          onClick={() => setShowUserMenu(false)}
                          className="block px-4 py-3 text-sm hover:bg-[#f4efe8]"
                        >
                          Đơn hàng của tôi
                        </Link>
                      )}

                      <Link
                        href="/doi-mat-khau"
                        onClick={() => setShowUserMenu(false)}
                        className="block px-4 py-3 text-sm hover:bg-[#f4efe8]"
                      >
                        Đổi mật khẩu
                      </Link>

                      <button
                        onClick={() => signOut(auth)}
                        className="block w-full px-4 py-3 text-left text-sm hover:bg-[#f4efe8]"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
                
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="hidden rounded-full bg-black px-4 py-2 text-sm text-white md:inline-block"
                  >
                    Quản lý
                  </Link>
                )}
              </>
            ) : (
              <Link
                href="/dang-nhap"
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm shadow-sm hover:opacity-70"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          href="/"
          className="mb-6 inline-block rounded-lg border bg-white px-4 py-2"
        >
          ← Quay lại
        </Link>

        <div className="grid grid-cols-1 gap-8 rounded-3xl bg-white p-6 shadow md:grid-cols-2">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="h-[500px] w-full rounded-2xl object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              {product.category === "den"
                ? "Đèn"
                : product.category === "trangtri"
                ? "Đồ trang trí"
                : "Áo hot trend"}
            </p>

            <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>

            <p className="mt-4 text-2xl font-bold text-red-500">
              {vnd(product.price)}
            </p>

            <p className="mt-6 leading-7 text-gray-700">
              {product.description}
            </p>

            <button
              onClick={() => {
                const cartKey = auth.currentUser
                  ? `cart_${auth.currentUser.uid}`
                  : "cart_guest";

                let cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

                const exist = cart.find((item) => item.id === product.id);

                if (exist) {
                  exist.quantity += 1;
                } else {
                  cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  });
                }

                localStorage.setItem(cartKey, JSON.stringify(cart));
                alert("Đã thêm vào giỏ hàng");
              }}
              className="mt-8 w-fit rounded-xl bg-black px-6 py-3 text-white"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}