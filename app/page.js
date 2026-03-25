"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { defaultProducts } from "@/app/du-lieu-san-pham";

const nav = [
  { name: "Trang chủ", link: "/" },
  { name: "Sản phẩm", link: "/cua-hang" },
  { name: "Liên hệ", link: "#footer" },
];

const categories = [
  {
    title: "Đèn trang trí",
    desc: "Đèn ngủ • Đèn bàn • Chill",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=60",
  },
  {
    title: "Kệ & bàn nhỏ",
    desc: "Gỗ • Minimal • Decor",
    img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1600&q=60",
  },
  {
    title: "Đồ trang trí",
    desc: "Lọ hoa • Tranh • Phụ kiện",
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=60",
  },
];

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";
const off = (oldPrice, price) =>
  oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

function Badge({ text }) {
  const map = {
    Sale: "bg-rose-500 text-white",
    Hot: "bg-black text-white",
    New: "bg-emerald-500 text-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        map[text] || "bg-slate-900 text-white"
      }`}
    >
      {text}
    </span>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("admin_products") || "[]");

    if (saved.length > 0) {
      setProducts(saved);
    } else {
      localStorage.setItem("admin_products", JSON.stringify(defaultProducts));
      setProducts(defaultProducts);
    }

    const user = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(user);
  }, []);

  const featuredProducts = products.slice(0, 6);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("Đã đăng xuất");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-slate-600">
          <div>Miễn phí vận chuyển cho đơn hàng trên 199k</div>
          <div></div>
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
          <Link href="/" className="flex min-w-[230px] items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-xl font-extrabold text-white">
              H
            </div>

            <div className="leading-tight">
              <div className="whitespace-nowrap text-2xl font-extrabold tracking-tight">
                Hisu store
              </div>
              <div className="mt-1 whitespace-nowrap text-sm text-slate-500">
                Trang trí • Nội thất • Phong cách
              </div>
            </div>
          </Link>

          <nav className="ml-8 hidden items-center gap-6 whitespace-nowrap text-base font-semibold md:flex">
            {nav.map((item) =>
              item.link.startsWith("#") ? (
                <a
                  key={item.name}
                  href={item.link}
                  className="transition hover:text-rose-500"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.link}
                  className="transition hover:text-rose-500"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          <div className="ml-auto hidden w-full max-w-md items-center lg:flex">
            <div className="flex w-full items-center rounded-full border px-4 py-2">
              <input
                className="w-full text-sm outline-none"
                placeholder="Tìm kiếm..."
              />
              <button className="text-sm font-semibold text-slate-700 hover:text-rose-500">
                Tìm
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gio-hang"
              className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              Giỏ hàng
            </Link>

            {currentUser?.role === "admin" && (
              <Link
                href="/admin"
                className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Quản trị
              </Link>
            )}

            {currentUser ? (
              <button
                onClick={handleLogout}
                className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Đăng xuất
              </button>
            ) : (
              <Link
                href="/dang-nhap"
                className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-slate-100">
            <img
              className="h-[420px] w-full object-cover"
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=60"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white">
              <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                Hàng mới cập bến
              </div>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight">
                Bộ sưu tập
                <br />
                Thời thượng
              </h1>
              <p className="mt-2 max-w-md text-sm text-white/85">
                Trang trí không gian sống của bạn với phong cách tối giản và hiện đại.
              </p>
              <div className="mt-5 flex gap-2">
                <Link
                  href="/cua-hang"
                  className="rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  Mua thôi
                </Link>
                <a
                  href="#products"
                  className="rounded-full border border-white/35 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Xem thêm
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="relative overflow-hidden rounded-3xl border bg-white">
              <div className="p-6">
                <div className="text-xs font-semibold text-rose-500">Hàng nóng</div>
                <div className="mt-1 text-2xl font-extrabold">Tuần lễ trang trí</div>
                <p className="mt-1 text-sm text-slate-600">
                  Ưu đãi cho những món đồ nhỏ nhưng làm căn phòng đẹp hơn.
                </p>
                <Link
                  href="/cua-hang"
                  className="mt-4 inline-block text-sm font-semibold hover:text-rose-500"
                >
                  Tìm hiểu →
                </Link>
              </div>
              <div className="absolute right-0 top-0 h-full w-44 bg-slate-100">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=60"
                  alt="promo"
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border bg-white">
              <div className="p-6">
                <div className="text-xs font-semibold text-rose-500">Phong cách</div>
                <div className="mt-1 text-2xl font-extrabold">Góc nhỏ</div>
                <p className="mt-1 text-sm text-slate-600">
                  Biến góc nhỏ của bạn thành nơi chill đúng nghĩa.
                </p>
                <Link
                  href="/cua-hang"
                  className="mt-4 inline-block text-sm font-semibold hover:text-rose-500"
                >
                  Mua thôi →
                </Link>
              </div>
              <div className="absolute right-0 top-0 h-full w-44 bg-slate-100">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=60"
                  alt="promo2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-2">
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.title}
              href="/cua-hang"
              className="group relative overflow-hidden rounded-3xl border bg-slate-100"
            >
              <img
                src={c.img}
                alt={c.title}
                className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-xl font-extrabold">{c.title}</div>
                <div className="mt-1 text-sm text-white/85">{c.desc}</div>
                <div className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  Xem thêm →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="products" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-rose-500">Phổ biến</div>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
              Mặt hàng hot
            </h2>
          </div>
          <Link
            href="/cua-hang"
            className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p) => {
            const percent = off(p.oldPrice, p.price);

            return (
              <div
                key={p.id}
                className="group overflow-hidden rounded-3xl border bg-white"
              >
                <div className="relative">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-72 w-full object-cover"
                  />

                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <Badge text={p.badge} />
                    {percent > 0 && (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-slate-900">
                        -{percent}%
                      </span>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 transition group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(p)}
                        className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                      >
                        Thêm vào giỏ hàng
                      </button>

                      <Link
                        href={`/san-pham/${p.id}`}
                        className="rounded-full border bg-white px-5 py-2.5 text-sm font-semibold hover:bg-slate-50"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </div>

                <div className="p-4">
                  <div className="text-xs text-slate-500">Hisu store</div>
                  <div className="mt-1 line-clamp-2 text-sm font-bold">
                    {p.name}
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <div className="text-lg font-extrabold">{vnd(p.price)}</div>
                    <div className="text-sm text-slate-500 line-through">
                      {vnd(p.oldPrice)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer id="footer" className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="text-lg font-extrabold">Hisu store</div>
              <p className="mt-2 text-sm text-slate-600">
                Website bán đồ decor và nội thất nhỏ theo phong cách hiện đại, tối giản.
              </p>
            </div>

            <div className="text-sm">
              <div className="font-bold">Liên kết</div>
              <div className="mt-3 grid gap-2 text-slate-600">
                <Link href="/cua-hang" className="hover:text-rose-500">
                  Tất cả sản phẩm
                </Link>
                <a href="#top" className="hover:text-rose-500">
                  Về chúng tôi
                </a>
                <a href="#footer" className="hover:text-rose-500">
                  Liên hệ
                </a>
              </div>
            </div>

            <div className="text-sm">
              <div className="font-bold">Tin tức</div>
              <div className="mt-3 flex gap-2">
                <input
                  className="w-full rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-rose-200"
                  placeholder="Email..."
                />
                <button className="rounded-full bg-rose-500 px-5 py-2 font-semibold text-white hover:bg-rose-600">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 text-xs text-slate-500">
            © {new Date().getFullYear()} Hisu store • Demo Vercel
          </div>
        </div>
      </footer>
    </div>
  );
}