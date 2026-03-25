export default function DangKy() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border p-6">
        <h1 className="text-2xl font-bold mb-4">Đăng ký</h1>

        <input className="w-full border px-4 py-2 mb-3" placeholder="Họ tên" />
        <input className="w-full border px-4 py-2 mb-3" placeholder="Email" />
        <input type="password" className="w-full border px-4 py-2 mb-4" placeholder="Mật khẩu" />

        <button className="w-full bg-black text-white py-2 rounded-lg">
          Tạo tài khoản
        </button>

        <p className="mt-4 text-sm">
          Đã có tài khoản?{" "}
          <a href="/dang-nhap" className="text-blue-500">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
}