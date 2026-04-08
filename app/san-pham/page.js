"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function SanPhamPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("tatca");
  const [selectedPrice, setSelectedPrice] = useState("tatca");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");

    if (
      categoryFromUrl &&
      ["tatca", "den", "trangtri", "ao"].includes(categoryFromUrl)
    ) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("tatca");
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs
          .map((doc, index) => ({
            id: doc.id,
            ...doc.data(),
            sortOrder: doc.data().sortOrder ?? index,
          }))
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        setProducts(data);

      } catch (error) {
        console.error("Lỗi lấy sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

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

  const categories = [
    { id: "tatca", name: "Tất cả" },
    { id: "den", name: "Đèn" },
    { id: "trangtri", name: "Decor" },
    { id: "ao", name: "Thời trang" },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "tatca") {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (selectedPrice === "duoi200") {
      result = result.filter((item) => Number(item.price) < 200000);
    } else if (selectedPrice === "200-500") {
      result = result.filter(
        (item) => Number(item.price) >= 200000 && Number(item.price) <= 500000
      );
    } else if (selectedPrice === "tren500") {
      result = result.filter((item) => Number(item.price) > 500000);
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name?.toLowerCase().includes(keyword) ||
          item.description?.toLowerCase().includes(keyword)
      );
    }

    return result;
  }, [products, selectedCategory, selectedPrice, searchTerm]);

  return (
    <main className="min-h-screen bg-[#f7f3ee] text-[#171717]">
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
                    className="hidden rounded-full bg-black px-5 py-2 text-sm text-white md:inline-block"
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

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black transition hover:bg-black hover:text-white"
          >
            ← Về trang chủ
          </Link>
        </div>

        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            Sản phẩm
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Tất cả sản phẩm</h1>
          <p className="mt-3 text-sm text-black/55">
            Khám phá đầy đủ các mẫu đèn, decor và sản phẩm hot trend của Hisu
            Store.
          </p>
        </div>

        <div className="mb-8 rounded-[24px] border border-black/10 bg-white p-4 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <label className="mb-2 block text-sm font-medium text-black/70">
                Tìm kiếm
              </label>
              <input
                type="text"
                placeholder="Tìm theo tên sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border border-black/10 bg-[#f8f6f2] px-4 py-3 text-sm outline-none transition focus:border-black/30"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-black/70">
                Danh mục
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-full border border-black/10 bg-[#f8f6f2] px-4 py-3 text-sm outline-none transition focus:border-black/30"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-black/70">
                Khoảng giá
              </label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full rounded-full border border-black/10 bg-[#f8f6f2] px-4 py-3 text-sm outline-none transition focus:border-black/30"
              >
                <option value="tatca">Tất cả mức giá</option>
                <option value="duoi200">Dưới 200.000đ</option>
                <option value="200-500">200.000đ - 500.000đ</option>
                <option value="tren500">Trên 500.000đ</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  selectedCategory === cat.id
                    ? "bg-black text-white"
                    : "border border-black/10 bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                {cat.name}
              </button>
            ))}

            <button
              onClick={() => {
                setSelectedCategory("tatca");
                setSelectedPrice("tatca");
                setSearchTerm("");
              }}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black transition hover:bg-black hover:text-white"
            >
              Xóa lọc
            </button>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-black/55">
            Hiển thị{" "}
            <span className="font-semibold text-black">
              {filteredProducts.length}
            </span>{" "}
            sản phẩm
          </p>

          <Link href="/" className="text-sm text-black/60 hover:text-black">
            ← Quay lại trang chủ
          </Link>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-[24px] border border-black/10 bg-white p-12 text-center">
            <p className="text-lg font-medium">Không tìm thấy sản phẩm phù hợp</p>
            <p className="mt-2 text-sm text-black/55">
              Thử đổi từ khóa tìm kiếm hoặc bộ lọc.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">
            {filteredProducts.map((item) => (
              <Link
                key={item.id}
                href={`/san-pham/${item.id}`}
                className="group block overflow-hidden rounded-[18px] border border-black/8 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-black/45">
                    {item.category === "den"
                      ? "Đèn"
                      : item.category === "trangtri"
                      ? "Decor"
                      : "Thời trang"}
                  </p>

                  <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug">
                    {item.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-black/55">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <p className="text-base font-semibold">{vnd(item.price)}</p>

                    <button
                      onClick={(e) => {
                        e.preventDefault(); // chặn click lan ra card

                        const cartKey = auth.currentUser
                          ? `cart_${auth.currentUser.uid}`
                          : "cart_guest";

                        let cart = JSON.parse(localStorage.getItem(cartKey) || "[]");

                        const exist = cart.find((p) => p.id === item.id);

                        if (exist) {
                          exist.quantity += 1;
                        } else {
                          cart.push({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: 1,
                          });
                        }

                        localStorage.setItem(cartKey, JSON.stringify(cart));
                        alert("Đã thêm vào giỏ hàng");
                      }}
                      className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}