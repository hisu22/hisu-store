const categories = [
  { name: "Điện thoại", desc: "iPhone, Samsung, Xiaomi..." },
  { name: "Quần áo", desc: "Áo thun, hoodie, jeans..." },
  { name: "Phụ kiện", desc: "Tai nghe, sạc, ốp lưng..." },
  { name: "Sale", desc: "Giảm giá hot mỗi ngày" },
];

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 29990000,
    oldPrice: 33990000,
    tag: "Hot",
    img: "https://images.unsplash.com/photo-1510557880182-3d4d3c1aa6fd?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 26990000,
    oldPrice: 29990000,
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 3,
    name: "AirPods Pro (Gen 2)",
    price: 4990000,
    oldPrice: 5990000,
    tag: "Bán chạy",
    img: "https://images.unsplash.com/photo-1588159343745-445ae0b16383?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 4,
    name: "Áo Hoodie Basic Premium",
    price: 299000,
    oldPrice: 399000,
    tag: "New",
    img: "https://images.unsplash.com/photo-1520975958225-5ddad8a3f281?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 5,
    name: "Quần Jean Slimfit",
    price: 399000,
    oldPrice: 499000,
    tag: "Hot",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: 6,
    name: "Áo thun Oversize",
    price: 199000,
    oldPrice: 249000,
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1520975682031-aebf3b0f9b57?auto=format&fit=crop&w=1200&q=60",
  },
];

const vnd = (n) => n.toLocaleString("vi-VN") + "đ";

function discountPercent(oldPrice, price) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black text-white font-bold">
              H
            </div>
            <div>
              <div className="text-base font-extrabold leading-none">Hisu store</div>
              <div className="text-xs text-slate-500">Điện thoại • Quần áo • Phụ kiện</div>
            </div>
          </div>

          <div className="ml-auto hidden w-full max-w-xl items-center gap-2 md:flex">
            <input
              className="w-full rounded-2xl border bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
              placeholder="Tìm sản phẩm… (ví dụ: iPhone, hoodie)"
            />
            <button className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white">
              Tìm
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-2xl border bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50">
              Giỏ hàng
            </button>
            <button className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white">
              Đăng nhập
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 overflow-hidden rounded-3xl bg-gradient-to-br from-black to-slate-800 p-8 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
              ⚡ Flash Sale • Freeship đơn từ 199k
            </div>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
              Mua sắm tại <span className="underline decoration-white/30">Hisu store</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm text-white/80">
              UI tạm thời để nộp bài + deploy Vercel. Sau đó triển khai dần: danh mục, giỏ hàng,
              checkout, quản trị sản phẩm.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="#products"
                className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black"
              >
                Xem sản phẩm
              </a>
              <button className="rounded-2xl border border-white/30 px-5 py-2.5 text-sm font-medium text-white">
                Theo dõi đơn
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs text-white/70">Sản phẩm</div>
                <div className="mt-1 text-xl font-bold">1,000+</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs text-white/70">Đơn hàng</div>
                <div className="mt-1 text-xl font-bold">Nhanh gọn</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs text-white/70">Hỗ trợ</div>
                <div className="mt-1 text-xl font-bold">24/7</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="text-base font-semibold">Danh mục</div>
            <div className="mt-3 grid gap-2">
              {categories.map((c) => (
                <button
                  key={c.name}
                  className="rounded-2xl border bg-white px-4 py-3 text-left hover:bg-slate-50"
                >
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-slate-500">{c.desc}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
              Tip: Muốn giống mẫu bạn gửi thì gửi ảnh UI, mình chỉnh theo.
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold">Sản phẩm nổi bật</h2>
          <div className="text-sm text-slate-600">Hiển thị {products.length} sản phẩm</div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const off = discountPercent(p.oldPrice, p.price);

            return (
              <div
                key={p.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5"
              >
                <div className="relative">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-full bg-black/80 px-3 py-1 text-xs font-medium text-white">
                      {p.tag}
                    </span>
                    {off > 0 && (
                      <span className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
                        -{off}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold">{p.name}</h3>

                  <div className="mt-2 flex items-baseline gap-2">
                    <div className="text-lg font-extrabold">{vnd(p.price)}</div>
                    <div className="text-sm text-slate-500 line-through">{vnd(p.oldPrice)}</div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button className="w-full rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white">
                      Thêm giỏ
                    </button>
                    <button className="rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-slate-50">
                      Xem
                    </button>
                  </div>

                  <div className="mt-3 text-xs text-slate-500">⭐ 4.8 • Đã bán 1.2k • Giao nhanh</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600">
          © {new Date().getFullYear()} Hisu store — Demo đồ án (Vercel)
        </div>
      </footer>
    </div>
  );
}