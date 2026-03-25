export default function DangNhap() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border p-6">
        <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>

        <input
          className="w-full border rounded-lg px-4 py-2 mb-3"
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          placeholder="Mật khẩu"
        />

        <button className="w-full bg-black text-white py-2 rounded-lg">
          Đăng nhập
        </button>

        <p className="mt-4 text-sm">
          Chưa có tài khoản?{" "}
          <a href="/dang-ky" className="text-blue-500">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
}