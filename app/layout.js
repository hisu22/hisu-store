import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Hisu Store - Web bán đồ decor và nội thất",
  description:
    "Hisu Store - Chuyên đồ decor, nội thất nhỏ và phụ kiện trang trí hiện đại",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}