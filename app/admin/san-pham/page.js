"use client";

import { useEffect, useMemo, useState } from "react";
import { db } from "../../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [draggedId, setDraggedId] = useState(null);
  const [isSorting, setIsSorting] = useState(false);

  const ITEMS_PER_PAGE = 10;

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "den",
    description: "",
    active: true,
    featured: false,
  });

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const data = querySnapshot.docs
      .map((item, index) => ({
        id: item.id,
        ...item.data(),
        active: item.data().active ?? true,
        featured: item.data().featured ?? false,
        sortOrder: item.data().sortOrder ?? index,
      }))
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      image: "",
      category: "den",
      description: "",
      active: true,
      featured: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.image || !form.description) {
      alert("Nhập thiếu thông tin");
      return;
    }

    if (editingId) {
      await updateDoc(doc(db, "products", editingId), {
        ...form,
        price: Number(form.price),
      });
      alert("Cập nhật sản phẩm thành công");
    } else {
      await addDoc(collection(db, "products"), {
        ...form,
        price: Number(form.price),
        sortOrder: products.length,
      });
      alert("Thêm sản phẩm thành công");
    }

    resetForm();
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn có chắc muốn xóa sản phẩm này không?");
    if (!ok) return;

    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name || "",
      price: item.price || "",
      image: item.image || "",
      category: item.category || "den",
      description: item.description || "",
      active: item.active ?? true,
      featured: item.featured ?? false,
    });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleActive = async (item) => {
    await updateDoc(doc(db, "products", item.id), {
      active: !(item.active ?? true),
    });
    fetchProducts();
  };

  const saveProductOrder = async (updatedProducts) => {
    const batch = writeBatch(db);

    updatedProducts.forEach((item, index) => {
      const ref = doc(db, "products", item.id);
      batch.update(ref, { sortOrder: index });
    });

    await batch.commit();
  };

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDrop = async (targetId) => {
    if (!draggedId || draggedId === targetId) return;

    const updated = [...products];
    const fromIndex = updated.findIndex((item) => item.id === draggedId);
    const toIndex = updated.findIndex((item) => item.id === targetId);

    if (fromIndex === -1 || toIndex === -1) return;

    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);

    const reordered = updated.map((item, index) => ({
      ...item,
      sortOrder: index,
    }));

    setProducts(reordered);
    setDraggedId(null);

    try {
      await saveProductOrder(reordered);
    } catch (error) {
      console.error("Lỗi lưu thứ tự sản phẩm:", error);
      alert("Không lưu được thứ tự sản phẩm");
      fetchProducts();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const getCategoryLabel = (category) => {
    if (category === "den") return "Đèn";
    if (category === "trangtri") return "Trang trí";
    if (category === "ao") return "Áo";
    return category;
  };

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";
      const category = getCategoryLabel(item.category)?.toLowerCase() || "";

      return (
        name.includes(keyword) ||
        description.includes(keyword) ||
        category.includes(keyword)
      );
    });
  }, [products, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const displayedProducts = isSorting ? filteredProducts : paginatedProducts;

  useEffect(() => {
    setCurrentPage(1);
    setIsSorting(false);
  }, [search]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black">Quản lý sản phẩm</h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý danh sách sản phẩm của cửa hàng
          </p>
        </div>

        <button
          onClick={() => {
            if (showForm && !editingId) {
              setShowForm(false);
            } else {
              setEditingId(null);
              setForm({
                name: "",
                price: "",
                image: "",
                category: "den",
                description: "",
                active: true,
                featured: false,
              });
              setShowForm(true);
            }
          }}
          className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          {showForm && !editingId ? "Hủy" : "Thêm sản phẩm"}
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">
              {editingId ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h2>

            <button
              onClick={resetForm}
              className="text-sm text-gray-500 transition hover:text-black"
            >
              Hủy
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input
              placeholder="Tên sản phẩm"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-black/10 bg-[#f8f6f2] p-3 outline-none transition focus:border-black"
            />

            <input
              placeholder="Giá"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-xl border border-black/10 bg-[#f8f6f2] p-3 outline-none transition focus:border-black"
            />

            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <input
                  placeholder="Link ảnh"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="flex-1 rounded-xl border border-black/10 bg-[#f8f6f2] p-3 outline-none transition focus:border-black"
                />

                <label className="whitespace-nowrap cursor-pointer rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black transition hover:bg-black/5">
                  Chọn ảnh
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="mt-3 h-16 w-16 rounded-xl border border-black/10 object-cover"
                />
              )}
            </div>

            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl border border-black/10 bg-[#f8f6f2] p-3 outline-none transition focus:border-black"
            >
              <option value="den">Đèn</option>
              <option value="trangtri">Trang trí</option>
              <option value="ao">Áo</option>
            </select>

            <input
              placeholder="Mô tả"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full rounded-xl border border-black/10 bg-[#f8f6f2] p-3 outline-none transition focus:border-black"
            />

            <label className="flex items-center gap-3 rounded-xl border border-black/10 bg-[#f8f6f2] p-3">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="h-4 w-4"
              />
              <span className="text-sm text-black">Hiển thị sản phẩm</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-black/10 bg-[#f8f6f2] p-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4"
              />
              <span className="text-sm text-black">Sản phẩm nổi bật</span>
            </label>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90"
            >
              {editingId ? "Cập nhật sản phẩm" : "Lưu sản phẩm"}
            </button>

            <button
              onClick={resetForm}
              className="rounded-xl border border-black/10 bg-white px-5 py-3 text-black transition hover:bg-black/5"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      <div className="rounded-2xl bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-black/5 p-5 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-semibold text-black">Danh sách sản phẩm</h2>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {isSorting
                ? `Đang sắp xếp ${filteredProducts.length} mục`
                : `Hiển thị ${Math.min(filteredProducts.length, ITEMS_PER_PAGE)} / ${filteredProducts.length} mục`}
            </span>

            <button
              onClick={() => setIsSorting((prev) => !prev)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                isSorting
                  ? "bg-black text-white"
                  : "border border-black/10 bg-white text-black hover:bg-black/5"
              }`}
            >
              {isSorting ? "Xong sắp xếp" : "Sắp xếp thứ tự"}
            </button>

            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-[#f8f6f2] px-4 py-2 outline-none transition focus:border-black md:w-72"
            />
          </div>
        </div>

        <div className="hidden grid-cols-13 gap-4 border-b border-black/5 px-5 py-4 text-sm font-semibold text-gray-500 md:grid">
          <div className="col-span-1">{isSorting ? "Kéo" : ""}</div>
          <div className="col-span-1">Ảnh</div>
          <div className="col-span-3">Tên sản phẩm</div>
          <div className="col-span-2">Danh mục</div>
          <div className="col-span-2">Giá</div>
          <div className="col-span-1">Hiển thị</div>
          <div className="col-span-1">Mô tả</div>
          <div className="col-span-2 text-right">Thao tác</div>
        </div>

        <div>
          {paginatedProducts.length === 0 ? (
            <div className="p-5 text-gray-500">Không có sản phẩm phù hợp</div>
          ) : (
            displayedProducts.map((item) => (
              <div
                key={item.id}
                draggable={isSorting}
                onDragStart={() => isSorting && handleDragStart(item.id)}
                onDragOver={(e) => isSorting && e.preventDefault()}
                onDrop={() => isSorting && handleDrop(item.id)}
                className={`grid grid-cols-1 gap-4 border-b border-black/5 px-5 py-4 last:border-b-0 md:grid-cols-13 md:items-center ${
                  isSorting ? "bg-[#fffdf9]" : ""
                }`}
              >
                <div className="hidden md:col-span-1 md:flex">
                  {isSorting ? (
                    <button
                      type="button"
                      className="cursor-grab rounded-xl border border-black/10 bg-[#f8f6f2] px-3 py-2 text-lg text-gray-500 active:cursor-grabbing"
                      title="Giữ và kéo để đổi thứ tự"
                    >
                      ⋮⋮
                    </button>
                  ) : null}
                </div>

                <div className="md:col-span-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                </div>

                <div className="md:col-span-3">
                  <h3 className="font-semibold text-black">{item.name}</h3>
                </div>

                <div className="md:col-span-2">
                  <span className="inline-block rounded-full bg-[#f3efe8] px-3 py-1 text-sm text-black">
                    {getCategoryLabel(item.category)}
                  </span>
                </div>

                <div className="md:col-span-2 font-medium text-black">
                  {Number(item.price).toLocaleString("vi-VN")}đ
                </div>

                <div className="md:col-span-1">
                  <button
                    onClick={() => handleToggleActive(item)}
                    className={`relative h-7 w-12 rounded-full transition ${
                      item.active ?? true ? "bg-black" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                        item.active ?? true ? "left-6" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="truncate text-sm text-gray-500 md:col-span-1">
                  {item.description}
                </div>

                <div className="flex gap-2 md:col-span-2 md:justify-end">
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm text-black transition hover:bg-black/5"
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-xl bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {!isSorting && (
          <div className="flex flex-col gap-3 border-t border-black/5 p-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-500">
              Trang {currentPage} / {totalPages}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm text-black transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Trước
              </button>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm text-black transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}