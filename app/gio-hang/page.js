"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("tien-mat");
  const [phone, setPhone] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [removingId, setRemovingId] = useState(null);

  const getCartKey = () => {
    const user = auth.currentUser;
    return user ? `cart_${user.uid}` : "cart_guest";
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const key = user ? `cart_${user.uid}` : "cart_guest";

      const data = JSON.parse(localStorage.getItem(key) || "[]").map((item) => ({
        ...item,
        selected: item.selected ?? true,
      }));

      setCart(data);
    });

    return () => unsubscribe();
  }, []);

  const vnd = (price) => Number(price).toLocaleString("vi-VN") + "đ";

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem(getCartKey(), JSON.stringify(newCart));
  };

  const increaseQuantity = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const decreaseQuantity = (id) => {
    const newCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(newCart);
  };

  const removeItem = (id) => {
    setRemovingId(id);

    setTimeout(() => {
      const newCart = cart.filter((item) => item.id !== id);
      updateCart(newCart);
      setRemovingId(null);
    }, 220);
  };

  const toggleSelectItem = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    updateCart(newCart);
  };

  const toggleSelectAll = () => {
    const allSelected = cart.every((item) => item.selected);

    const newCart = cart.map((item) => ({
      ...item,
      selected: !allSelected,
    }));

    updateCart(newCart);
  };

  const clearCart = () => {
    const confirmDelete = window.confirm("Bạn có chắc là muốn xóa tất cả sản phẩm trong giỏ hàng không?");

    if (!confirmDelete) return;

    localStorage.removeItem(getCartKey());
    setCart([]);
  };

  const handleOrder = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Bạn cần đăng nhập trước khi đặt hàng");
        window.location.href = "/dang-nhap";
        return;
      }

      if (cart.length === 0) {
        alert("Giỏ hàng đang trống");
        return;
      }

      if (!receiverName.trim()) {
        alert("Vui lòng nhập tên người nhận");
        return;
      }

      if (!phone.trim()) {
        alert("Vui lòng nhập số điện thoại");
        return;
      }

      if (!/^[0-9]{9,11}$/.test(phone.trim())) {
        alert("Số điện thoại không hợp lệ");
        return;
      }

      if (!address.trim()) {
        alert("Vui lòng nhập địa chỉ nhận hàng");
        return;
      }

      if (address.trim().length < 10) {
        alert("Địa chỉ quá ngắn");
        return;
      }
      const selectedItems = cart.filter((item) => item.selected);

        if (selectedItems.length === 0) {
          alert("Vui lòng chọn ít nhất 1 sản phẩm để đặt hàng");
          return;
        }

      await addDoc(collection(db, "orders"), {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "",
        receiverName: receiverName,
        phone: phone,
        address: address,
        paymentMethod: paymentMethod,
        items: selectedItems,
        total: total,
        status: "cho-xac-nhan",
        createdAt: new Date().toISOString(),
      });

      localStorage.removeItem(cartKey);
      setCart([]);
      setReceiverName("");
      setPhone("");
      setAddress("");
      setPaymentMethod("tien-mat");

      alert("Đặt hàng thành công");
    } catch (error) {
      alert("Đặt hàng thất bại");
      console.log(error);
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      item.selected ? sum + Number(item.price) * Number(item.quantity) : sum,
    0
  );

  return (
    <main className="min-h-screen bg-[#f6f3ee] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Giỏ hàng</h1>

          <div className="flex gap-3">

            <Link
              href="/"
              className="rounded-xl border border-black/10 bg-white px-4 py-2 transition hover:bg-black/5 active:scale-95"
            >
              ← Về trang chủ
            </Link>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-xl bg-white p-6">
            <p>Chưa có sản phẩm trong giỏ hàng</p>
          </div>
        ) : (
          <>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition duration-200 hover:shadow-md ${
                    removingId === item.id
                      ? "scale-[0.98] opacity-0 translate-x-4"
                      : "scale-100 opacity-100 translate-x-0"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleSelectItem(item.id)}
                    className="h-5 w-5 cursor-pointer rounded border-black/20 accent-black"
                  />

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{vnd(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="h-9 w-9 rounded-xl bg-[#f1efe9] transition hover:bg-black/10 active:scale-95"
                    >
                      -
                    </button>

                    <span className="min-w-[30px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="h-9 w-9 rounded-xl bg-[#f1efe9] transition hover:bg-black/10 active:scale-95"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-28 text-right font-semibold">
                    {vnd(item.price * item.quantity)}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-xl bg-red-500 px-3 py-2 text-white transition hover:bg-red-600 active:scale-95"
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
            <div className="sticky bottom-4 mt-6 rounded-2xl border border-black/10 bg-white/95 p-5 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-5">
                  <label className="flex items-center gap-3 rounded-2xl border border-black/10 bg-[#f8f6f2] px-4 py-3">
                    <input
                      type="checkbox"
                      checked={cart.every((item) => item.selected)}
                      onChange={toggleSelectAll}
                      className="h-5 w-5 cursor-pointer rounded border-black/20 accent-black"
                    />
                    <span className="text-sm font-medium">Chọn tất cả</span>
                  </label>

                  <button
                    onClick={clearCart}
                    className="rounded-2xl bg-red-500 px-4 py-3 text-white transition hover:bg-red-600 active:scale-95"
                  >
                    Xóa tất cả
                  </button>
                </div>

                <div className="text-right">
                  <p className="mb-3 text-xl font-bold">Tổng: {vnd(total)}</p>

                  <Link
                    href="/dat-hang"
                    className="inline-block rounded-2xl bg-black px-6 py-3 text-white transition hover:opacity-90 active:translate-y-[1px] active:scale-[0.98]"
                  >
                    Tiếp tục đặt hàng
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}