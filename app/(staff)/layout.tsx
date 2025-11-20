import AdminHeader from '@/src/components/AdminHeader';
import Sidebar from '@/src/components/Sidebar';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex h-screen bg-[#F5F5F5]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
  );
}
