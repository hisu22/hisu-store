'use client';

import { useEffect } from 'react';

// Sửa lỗi 1: Thêm biến message và đặt chữ mặc định nếu không truyền gì vào
export default function Notification({ show, onClose, message = "Thêm vào giỏ hàng thành công!" }) {
  
  // Sửa lỗi 2: Dùng useEffect quản lý thời gian tự đóng 2 giây chuẩn Next.js
  useEffect(() => {
    if (!show) return;

    const id = setTimeout(() => {
      onClose();
    }, 2000);

    // Dọn dẹp bộ nhớ khi thông báo đóng lại
    return () => clearTimeout(id);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center max-w-xs w-full text-center border border-gray-100">
        
        {/* Ô tròn chứa dấu tích */}
        <div className="w-14 h-14 bg-green-50 flex items-center justify-center rounded-full mb-3 text-green-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={3} 
            stroke="currentColor" 
            className="w-7 h-7 animate-scale-up"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Dòng chữ thông báo linh hoạt */}
        <p className="text-gray-800 font-medium text-base">{message}</p>

      </div>
    </div>
  );
}