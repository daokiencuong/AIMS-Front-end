import { User } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-gray-900">Admin User</div>
            <div className="text-gray-500">Product Manager</div>
          </div>
          <div className="w-10 h-10 bg-[#3A7AFE] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
