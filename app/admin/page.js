"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { defaultProducts } from "@/app/du-lieu-san-pham";

const emptyForm = {
  id: null,
  name: "",
  price: "",
  oldPrice: "",
  badge: "New",
  category: "den",
  img: "",
  description: "",
};

const categoryLabel = {
  den: "Đèn",
  "ke-ban": "Kệ & bàn",
  "do-trang-tri": "Đồ trang trí",
};

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("admin_products") || "[]");

    if (saved.length > 0) {
      setProducts(saved);
    } else {
      localStorage.setItem("admin_products", JSON.stringify(defaultProducts));
      setProducts(defaultProducts);
    }
  }, []);

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("admin_products", JSON.stringify(newProducts));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.price || !form.category || !form.img.trim()) {
      alert("Vui lòng nhập đủ tên, giá, danh mục và ảnh");
      return;
    }

    if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      alert("Giá sản phẩm không hợp lệ");
      return;
    }

    if (form.oldPrice && (isNaN(Number(form.oldPrice)) || Number(form.oldPrice) < 0)) {
      alert("Giá cũ không hợp lệ");
      return;
    }

    if (isEditing) {
      const updated = products.map((item) =>
        item.id === form.id
          ? {
              ...item,
              name: form.name.trim(),
              price: Number(form.price),
              oldPrice: Number(form.oldPrice) || Number(form.price),
              badge: form.badge,
              category: form.category,
              img: form.img.trim(),
              description: form.description.trim(),
            }
          : item
      );

      saveProducts(updated);
      alert("Cập nhật sản phẩm thành công");
    } else {
      const newProduct = {
        id: Date.now(),
        name: form.name.trim(),
        price: Number(form.price),
        oldPrice: Number(form.oldPrice) || Number(form.price),
        badge: form.badge,
        category: form.category,
        img: form.img.trim(),
        description: form.description.trim(),
      };

      saveProducts([newProduct, ...products]);
      alert("Thêm sản phẩm thành công");
    }

    setForm(emptyForm);
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      badge: product.badge || "New",
      category: product.category || "den",
      img: product.img || "",
      description: product.description || "",
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa sản phẩm này không?");
    if (!confirmed) return;

    const newProducts = products.filter((item) => item.id !== id);
    saveProducts(newProducts);
    alert("Đã xóa sản phẩm");
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-semibold text-slate-600 hover:text-rose-500"
        >
          ← Quay về trang chủ
        </Link>

        <div className="mt-6">
          <div className="text-sm font-semibold text-rose-500">Quản trị hệ thống</div>
          <h1 className="mt-2 text-3xl font-extrabold">Quản lý sản phẩm</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-4 rounded-3xl border p-6 md:grid-cols-2"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Tên sản phẩm"
            className="rounded-xl border px-4 py-3 outline-none focus:border-rose-400"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3 outline-none focus:border-rose-400"
          >
            <option value="den">Đèn</option>
            <option value="ke-ban">Kệ & bàn</option>
            <option value="do-trang-tri">Đồ trang trí</option>
          </select>

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Giá"
            className="rounded-xl border px-4 py-3 outline-none focus:border-rose-400"
          />

          <input
            name="oldPrice"
            value={form.oldPrice}
            onChange={handleChange}
            placeholder="Giá cũ"
            className="rounded-xl border px-4 py-3 outline-none focus:border-rose-400"
          />

          <select
            name="badge"
            value={form.badge}
            onChange={handleChange}
            className="rounded-xl border px-4 py-3 outline-none focus:border-rose-400"
          >
            <option value="Hot">Hot</option>
            <option value="Sale">Sale</option>
            <option value="New">New</option>
          </select>

          <input
            name="img"
            value={form.img}
            onChange={handleChange}
            placeholder="Link ảnh"
            className="rounded-xl border px-4 py-3 outline-none focus:border-rose-400 md:col-span-2"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Mô tả sản phẩm"
            className="rounded-xl border px-4 py-3 outline-none focus:border-rose-400 md:col-span-2"
            rows={4}
          />

          <div className="flex gap-3 md:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-black px-6 py-3 font-semibold text-white hover:bg-slate-800"
            >
              {isEditing ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            </button>

            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-full border px-6 py-3 font-semibold hover:bg-slate-50"
              >
                Hủy
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-3xl border bg-white"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-4">
                <div className="text-xs text-slate-500">
                  {categoryLabel[item.category] || item.category}
                </div>
                <div className="mt-1 text-lg font-bold">{item.name}</div>
                <div className="mt-2 text-lg font-extrabold">
                  {Number(item.price).toLocaleString("vi-VN")}đ
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-full border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="mt-8 rounded-3xl border p-8 text-center text-slate-500">
            Chưa có sản phẩm nào.
          </div>
        )}
      </div>
    </div>
  );
}