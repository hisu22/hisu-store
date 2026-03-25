export default function Admin() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Trang quản trị</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border p-4 rounded-lg">Quản lý sản phẩm</div>
        <div className="border p-4 rounded-lg">Quản lý người dùng</div>
        <div className="border p-4 rounded-lg">Thống kê</div>
      </div>
    </div>
  );
}