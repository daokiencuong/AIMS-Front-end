'use client';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  User,
  LogOut,
  Box,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const location = usePathname();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/manager/products', label: 'Product Management', icon: Package },
    { path: '/manager/stock-adjustment', label: 'Stock Adjustment', icon: Box },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/manager/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (path: string) => {
    return location === path || location.startsWith(path + '/');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#3A7AFE] rounded-lg flex items-center justify-center">
            <span className="text-white">A</span>
          </div>
          <span className="text-gray-900">AIMS</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-[#3A7AFE] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
}
