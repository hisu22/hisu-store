"use client";

const nav = ["Trang chủ", "Cửa hàng", "Trang trí", "Liên hệ"];

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

const products = [
  {
    id: 1,
    name: "Đèn ngủ Moon Light",
    price: 299000,
    oldPrice: 399000,
    badge: "Hot",
    img: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: 2,
    name: "Kệ gỗ mini",
    price: 459000,
    oldPrice: 599000,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: 3,
    name: "Lọ hoa gốm trắng",
    price: 189000,
    oldPrice: 249000,
    badge: "New",
    img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: 4,
    name: "Tranh decor treo tường",
    price: 139000,
    oldPrice: 199000,
    badge: "Hot",
    img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: 5,
    name: "Đồng hồ treo tường",
    price: 349000,
    oldPrice: 499000,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: 6,
    name: "Nến thơm chill",
    price: 99000,
    oldPrice: 149000,
    badge: "New",
    img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1400&q=60",
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
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top bar */}
      <div className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-slate-600">
          <div>Miễn phí vận chuyển cho đơn hàng trên 199k</div>
          <div className="flex items-center gap-4">
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
          <div className="flex min-w-[230px] items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-xl font-extrabold text-white">
              H
            </div>

            <div className="leading-tight">
              <div className="text-2xl font-extrabold tracking-tight whitespace-nowrap">
                Hisu store
              </div>
              <div className="mt-1 text-sm text-slate-500 whitespace-nowrap">
                Trang trí • Nội thất • Phong cách
              </div>
            </div>
          </div>

          <nav className="ml-8 hidden items-center gap-5 text-sm font-semibold whitespace-nowrap md:flex">
            {nav.map((t) => (
              <a
                key={t}
                href="#"
                className="transition hover:text-rose-500"
                onClick={(e) => e.preventDefault()}
              >
                {t}
              </a>
            ))}
          </nav>

          <div className="ml-auto hidden w-full max-w-md items-center lg:flex">
            <div className="flex w-full items-center rounded-full border px-5 py-2.5">
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
            <button className="rounded-full border px-5 py-2.5 text-sm font-semibold hover:bg-slate-50">
              Giỏ hàng
            </button>
            <button className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
              Đăng nhập
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
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
                <a
                  href="#products"
                  className="rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  Mua thôi
                </a>
                <button className="rounded-full border border-white/35 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                  Xem thêm
                </button>
              </div>
            </div>
          </div>

          {/* Promo blocks */}
          <div className="grid gap-6">
            <div className="relative overflow-hidden rounded-3xl border bg-white">
              <div className="p-6">
                <div className="text-xs font-semibold text-rose-500">Hàng nóng</div>
                <div className="mt-1 text-2xl font-extrabold">Tuần lễ trang trí</div>
                <p className="mt-1 text-sm text-slate-600">
                  Ưu đãi cho những món đồ nhỏ nhưng làm căn phòng đẹp hơn.
                </p>
                <a
                  href="#products"
                  className="mt-4 inline-block text-sm font-semibold hover:text-rose-500"
                >
                  Tìm Hiểu →
                </a>
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
                <a
                  href="#products"
                  className="mt-4 inline-block text-sm font-semibold hover:text-rose-500"
                >
                  Mua thôi →
                </a>
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

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-2">
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((c) => (
            <a
              key={c.title}
              href="#products"
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
            </a>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-rose-500">Phổ biến</div>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
              Mặt hàng hot 
            </h2>
          </div>
          <div className="hidden items-center gap-2 text-sm sm:flex">
            <button className="rounded-full border px-4 py-2 font-semibold hover:bg-slate-50">
              Tất cả
            </button>
            <button className="rounded-full border px-4 py-2 font-semibold hover:bg-slate-50">
              Trang trí
            </button>
            <button className="rounded-full border px-4 py-2 font-semibold hover:bg-slate-50">
              Đồ Điện tử
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
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

                  <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center opacity-0 transition group-hover:opacity-100">
                    <div className="pointer-events-auto flex gap-2">
                      <button className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
                        Thêm vào giỏ hàng
                      </button>
                      <button className="rounded-full border bg-white px-5 py-2.5 text-sm font-semibold hover:bg-slate-50">
                        Xem chi tiết
                      </button>
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

      {/* Footer */}
      <footer className="border-t bg-white">
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
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-rose-500"
                >
                  Tất cả sản phẩm
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-rose-500"
                >
                  Về chúng tôi
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-rose-500"
                >
                  Liên hệ
                </a>
              </div>
            </div>

            <div className="text-sm">
              <div className="font-bold">Tin Tức</div>
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