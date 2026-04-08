"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function DatHangPage() {
  const [cart, setCart] = useState([]);
  const [receiverName, setReceiverName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("tien-mat");
  const [transferCode, setTransferCode] = useState("");

  const cartKey = auth.currentUser
    ? `cart_${auth.currentUser.uid}`
    : "cart_guest";

  useEffect(() => {
    const user = auth.currentUser;
    const key = user ? `cart_${user.uid}` : "cart_guest";

    const data = JSON.parse(localStorage.getItem(key) || "[]");
    const selectedItems = data.filter((item) => item.selected);
    setCart(selectedItems);

    const code = `DH-${Date.now()}`;
    setTransferCode(code);
  }, []);

  const vnd = (price) => Number(price).toLocaleString("vi-VN") + "đ";

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const qrUrl = `https://img.vietqr.io/image/MB-221105689999-compact2.png?amount=${total}&addInfo=${encodeURIComponent(
    transferCode
  )}&accountName=${encodeURIComponent("VU GIA HIEU")}`;

  const handleOrder = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Bạn cần đăng nhập trước khi đặt hàng");
        window.location.href = "/dang-nhap";
        return;
      }

      if (cart.length === 0) {
        alert("Không có sản phẩm nào được chọn");
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

      await addDoc(collection(db, "orders"), {
        uid: user.uid,
        email: user.email,
        name: user.displayName || "",
        receiverName,
        phone,
        address,
        paymentMethod,
        paymentStatus:
          paymentMethod === "chuyen-khoan" ? "cho-xac-nhan" : "chua-thanh-toan",
        transferCode: paymentMethod === "chuyen-khoan" ? transferCode : "",
        items: cart,
        total,
        status: "cho-xac-nhan",
        createdAt: new Date().toISOString(),
      });

      const oldCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      const remainingCart = oldCart.filter((item) => !item.selected);
      localStorage.setItem(cartKey, JSON.stringify(remainingCart));

      alert("Đặt hàng thành công");
      window.location.href = "/don-hang";
    } catch (error) {
      alert("Đặt hàng thất bại");
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f3ee] px-4 py-8 text-[#171717] md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-black/45">
              Đặt hàng
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">
              Xác nhận đơn hàng
            </h1>
          </div>

          <Link
            href="/gio-hang"
            className="inline-flex items-center rounded-2xl border border-black/10 bg-white px-5 py-3 transition hover:bg-black/5 active:translate-y-[1px] active:scale-[0.98]"
          >
            ← Quay lại giỏ hàng
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[28px] border border-black/5 bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-medium">
              Không có sản phẩm nào được chọn để đặt hàng
            </p>
            <p className="mt-2 text-sm text-black/55">
              Hãy quay lại giỏ hàng để chọn sản phẩm trước khi tiếp tục.
            </p>

            <div className="mt-6">
              <Link
                href="/gio-hang"
                className="inline-block rounded-2xl bg-black px-6 py-3 text-white transition hover:opacity-90 active:translate-y-[1px] active:scale-[0.98]"
              >
                Về giỏ hàng
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <div className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                Sản phẩm
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Sản phẩm đã chọn</h2>

              <div className="mt-5 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-2xl border border-black/5 bg-[#fcfbf8] p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold leading-snug">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm text-black/55">
                        Số lượng: {item.quantity}
                      </p>
                      <p className="mt-1 text-sm text-black/55">
                        Đơn giá: {vnd(item.price)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-black/45">Thành tiền</p>
                      <p className="mt-1 text-lg font-semibold">
                        {vnd(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[#f3efe8] p-4 text-right">
                <p className="text-sm text-black/45">Tổng thanh toán</p>
                <p className="mt-1 text-3xl font-semibold">{vnd(total)}</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                Thông tin
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Thông tin đặt hàng</h2>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-black/70">
                    Tên người nhận
                  </label>
                  <input
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="Nhập tên người nhận"
                    className="w-full rounded-2xl border border-black/10 bg-[#f8f6f2] px-4 py-3 outline-none transition focus:border-black/25 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black/70">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="w-full rounded-2xl border border-black/10 bg-[#f8f6f2] px-4 py-3 outline-none transition focus:border-black/25 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black/70">
                    Địa chỉ nhận hàng
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ đầy đủ"
                    rows={4}
                    className="w-full rounded-2xl border border-black/10 bg-[#f8f6f2] px-4 py-3 outline-none transition focus:border-black/25 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black/70">
                    Phương thức thanh toán
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full rounded-2xl border border-black/10 bg-[#f8f6f2] px-4 py-3 outline-none transition focus:border-black/25 focus:bg-white"
                  >
                    <option value="tien-mat">Thanh toán tiền mặt</option>
                    <option value="chuyen-khoan">Chuyển khoản</option>
                  </select>
                </div>
                
                {paymentMethod === "chuyen-khoan" && (
                  <div className="rounded-2xl border border-black/10 bg-[#fcfbf8] p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                      Thanh toán QR
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      Quét mã để chuyển khoản
                    </h3>

                    <div className="mt-4 flex flex-col items-center gap-4">
                      <img
                        src={qrUrl}
                        alt="QR chuyển khoản"
                        className="h-64 w-64 rounded-2xl border border-black/10 bg-white p-2 object-contain"
                      />

                      <div className="w-full rounded-2xl bg-white p-4 text-sm leading-7 text-black/70">
                        <p>
                          <span className="font-medium text-black">Ngân hàng:</span> MB Bank
                        </p>
                        <p>
                          <span className="font-medium text-black">Số tài khoản:</span>{" "}
                          221105689999
                        </p>
                        <p>
                          <span className="font-medium text-black">Chủ tài khoản:</span>{" "}
                          VU GIA HIEU
                        </p>
                        <p>
                          <span className="font-medium text-black">Số tiền:</span> {vnd(total)}
                        </p>
                        <p>
                          <span className="font-medium text-black">Nội dung:</span>{" "}
                          {transferCode}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleOrder}
                  className="w-full rounded-2xl bg-black px-6 py-3.5 text-white transition hover:opacity-90 active:translate-y-[1px] active:scale-[0.98]"
                >
                  Xác nhận đặt hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}