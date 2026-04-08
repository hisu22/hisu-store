"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openRoleMenu, setOpenRoleMenu] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleChangeRole = async (id, newRole) => {
    await updateDoc(doc(db, "users", id), {
      role: newRole,
    });

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );

    setOpenRoleMenu(null);
  };

  const filteredUsers = users.filter((user) => {
    const keyword = search.toLowerCase();

    return (
      (user.username || "").toLowerCase().includes(keyword) ||
      (user.email || "").toLowerCase().includes(keyword) ||
      (user.role || "user").toLowerCase().includes(keyword)
    );
  });

  const getRoleStyle = (role) => {
    if (role === "admin") {
      return "bg-black text-white";
    }
    return "bg-[#f3efe8] text-gray-700";
  };

  const getRoleIcon = (role) => {
    if (role === "admin") return "★";
    return "•";
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] bg-white px-7 py-6 shadow-sm ring-1 ring-black/5">
        <h1 className="text-[26px] font-bold tracking-tight text-black">
          Quản lý người dùng
        </h1>
        <p className="mt-2 text-[15px] text-gray-500">
          Quản lý danh sách tài khoản của cửa hàng
        </p>
      </div>

      <div className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5">
        <div className="flex flex-col gap-4 border-b border-gray-100 px-7 py-6 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-[22px] font-bold tracking-tight text-black">
            Danh sách người dùng
          </h2>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <span className="text-[15px] text-gray-500">
              Hiển thị {filteredUsers.length} / {users.length} mục
            </span>

            <input
              type="text"
              placeholder="Tìm kiếm tên, email, vai trò..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full rounded-2xl border border-gray-200 bg-[#f7f5f2] px-5 text-[15px] outline-none placeholder:text-gray-400 sm:w-[320px]"
            />
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="px-7 py-10 text-sm text-gray-500">
            Không có người dùng nào
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-[1.1fr_1.5fr_0.9fr] gap-4 border-b border-gray-100 px-7 py-5 text-[15px] font-semibold text-gray-500">
              <div>Tên người dùng</div>
              <div>Email</div>
              <div>Vai trò</div>
            </div>

            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-[1.1fr_1.5fr_0.9fr] gap-4 border-b border-gray-100 px-7 py-5 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-[17px] font-semibold text-black">
                    {user.username || "Không có"}
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="break-all text-[15px] text-gray-700">
                    {user.email || "Không có email"}
                  </p>
                </div>

                <div className="relative min-w-0">
                  <button
                    onClick={() =>
                      setOpenRoleMenu(openRoleMenu === user.id ? null : user.id)
                    }
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${getRoleStyle(
                      user.role || "user"
                    )}`}
                  >
                    <span>{getRoleIcon(user.role || "user")}</span>
                    <span>{user.role || "user"}</span>
                    <span className="text-xs">▾</span>
                  </button>

                  {openRoleMenu === user.id && (
                    <div className="absolute left-0 top-full z-10 mt-2 w-40 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">
                      <button
                        onClick={() => handleChangeRole(user.id, "user")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        <span>User</span>
                        {user.role === "user" && <span>✓</span>}
                      </button>

                      <button
                        onClick={() => handleChangeRole(user.id, "admin")}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm hover:bg-gray-50"
                      >
                        <span>Admin</span>
                        {user.role === "admin" && <span>✓</span>}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}