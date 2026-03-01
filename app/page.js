const nav = ["Home", "Shop", "Product", "Contact"];

const categories = [
  {
    title: "Phones",
    desc: "iPhone • Samsung • Xiaomi",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=60",
  },
  {
    title: "Clothes",
    desc: "Hoodie • Tee • Jeans",
    img: "https://images.unsplash.com/photo-1520975958225-5ddad8a3f281?auto=format&fit=crop&w=1600&q=60",
  },
  {
    title: "Accessories",
    desc: "Earbuds • Charger • Case",
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1600&q=60",
  },
];

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 29990000,
    oldPrice: 33990000,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1510557880182-3d4d3c1aa6fd?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 26990000,
    oldPrice: 29990000,
    badge: "Hot",
    img: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: 3,
    name: "AirPods Pro (Gen 2)",
    price: 4990000,
    oldPrice: 5990000,
    badge: "New",
    img: "https://images.unsplash.com/photo-1588159343745-445ae0b16383?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: 4,
    name: "Hoodie Basic Premium",
    price: 299000,
    oldPrice: 399000,
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1520975958225-5ddad8a3f281?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: 5,
    name: "Jeans Slimfit",
    price: 399000,
    oldPrice: 499000,
    badge: "Hot",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=60",
  },
  {
    id: 6,
    name: "Tee Oversize",
    price: 199000,
    oldPrice: 249000,
    badge: "New",
    img: "https://images.unsplash.com/photo-1520975682031-aebf3b0f9b57?auto=format&fit=crop&w=1400&q=60",
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
      {/* Top bar (Essence vibe) */}
      <div className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-slate-600">
          <div>Free shipping for orders over 199k</div>
          <div className="flex items-center gap-4">
            <span>Support</span>
            <span>Track order</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black text-white font-extrabold">
              H
            </div>
            <div className="leading-none">
              <div className="text-base font-extrabold tracking-tight">Hisu store</div>
              <div className="text-[11px] text-slate-500">phones • clothes • accessories</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 ml-8 text-sm font-semibold">
            {nav.map((t) => (
              <a
                key={t}
                href="#"
                className="hover:text-rose-500 transition"
                onClick={(e) => e.preventDefault()}
              >
                {t}
              </a>
            ))}
          </nav>

          {/* Search */}
          <div className="ml-auto hidden lg:flex w-full max-w-md items-center">
            <div className="flex w-full items-center rounded-full border px-4 py-2">
              <input
                className="w-full text-sm outline-none"
                placeholder="Search products..."
              />
              <button className="text-sm font-semibold text-slate-700 hover:text-rose-500">
                Search
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <button className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50">
              Cart
            </button>
            <button className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Login
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
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=60"
              alt="Hero"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
            <div className="absolute left-8 top-1/2 -translate-y-1/2 text-white">
              <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                New Collection
              </div>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight">
                Essence-style
                <br />
                shop UI
              </h1>
              <p className="mt-2 max-w-md text-sm text-white/85">
                Demo đồ án: UI tạm thời lên Vercel trước, rồi triển khai giỏ hàng/đặt hàng sau.
              </p>
              <div className="mt-5 flex gap-2">
                <a
                  href="#products"
                  className="rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-600"
                >
                  Shop now
                </a>
                <button className="rounded-full border border-white/35 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                  Learn more
                </button>
              </div>
            </div>
          </div>

          {/* Right column - promo blocks */}
          <div className="grid gap-6">
            <div className="relative overflow-hidden rounded-3xl border bg-white">
              <div className="p-6">
                <div className="text-xs font-semibold text-rose-500">Hot deals</div>
                <div className="mt-1 text-2xl font-extrabold">Phones week</div>
                <p className="mt-1 text-sm text-slate-600">
                  Up to 30% off selected models.
                </p>
                <a href="#products" className="mt-4 inline-block text-sm font-semibold hover:text-rose-500">
                  Discover →
                </a>
              </div>
              <div className="absolute right-0 top-0 h-full w-44 bg-slate-100">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=900&q=60"
                  alt="promo"
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border bg-white">
              <div className="p-6">
                <div className="text-xs font-semibold text-rose-500">Style</div>
                <div className="mt-1 text-2xl font-extrabold">Clothes drop</div>
                <p className="mt-1 text-sm text-slate-600">
                  Essentials for everyday outfit.
                </p>
                <a href="#products" className="mt-4 inline-block text-sm font-semibold hover:text-rose-500">
                  Shop →
                </a>
              </div>
              <div className="absolute right-0 top-0 h-full w-44 bg-slate-100">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1520975958225-5ddad8a3f281?auto=format&fit=crop&w=900&q=60"
                  alt="promo2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories (Essence style tiles) */}
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
              <div className="absolute left-6 bottom-6 text-white">
                <div className="text-xl font-extrabold">{c.title}</div>
                <div className="mt-1 text-sm text-white/85">{c.desc}</div>
                <div className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  Explore →
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
            <div className="text-xs font-semibold text-rose-500">Popular</div>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
              Featured products
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <button className="rounded-full border px-4 py-2 font-semibold hover:bg-slate-50">
              All
            </button>
            <button className="rounded-full border px-4 py-2 font-semibold hover:bg-slate-50">
              Phones
            </button>
            <button className="rounded-full border px-4 py-2 font-semibold hover:bg-slate-50">
              Clothes
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

                  {/* Hover actions like Essence */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center opacity-0 transition group-hover:opacity-100">
                    <div className="pointer-events-auto flex gap-2">
                      <button className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
                        Add to cart
                      </button>
                      <button className="rounded-full border bg-white px-5 py-2.5 text-sm font-semibold hover:bg-slate-50">
                        View
                      </button>
                    </div>
                  </div>

                  {/* subtle overlay on hover */}
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
                UI theo style Essence (Colorlib vibe). Triển khai dần: giỏ hàng, checkout, admin.
              </p>
            </div>
            <div className="text-sm">
              <div className="font-bold">Quick links</div>
              <div className="mt-3 grid gap-2 text-slate-600">
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-rose-500">All products</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-rose-500">About</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-rose-500">Contact</a>
              </div>
            </div>
            <div className="text-sm">
              <div className="font-bold">Newsletter</div>
              <div className="mt-3 flex gap-2">
                <input
                  className="w-full rounded-full border px-4 py-2 outline-none focus:ring-2 focus:ring-rose-200"
                  placeholder="Email..."
                />
                <button className="rounded-full bg-rose-500 px-5 py-2 font-semibold text-white hover:bg-rose-600">
                  Join
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