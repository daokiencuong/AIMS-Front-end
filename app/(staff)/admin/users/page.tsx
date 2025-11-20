import { Button } from '@/src/components/ui/button';
import { Eye, Pencil, UserX, KeyRound, Plus } from 'lucide-react';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: 'Active' | 'Blocked';
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@aims.com', roles: ['Admin'], status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@aims.com', roles: ['Product Manager'], status: 'Active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@aims.com', roles: ['Product Manager'], status: 'Blocked' },
];

export default function UserManagement() {
  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-900 text-2xl">User Management</div>
            <div className="text-gray-500 mt-1">Manage system users and permissions</div>
          </div>
          <Link href="/admin/users/create">
            <Button className="rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] gap-2">
              <Plus className="w-5 h-5" />
              Create User
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5F5F5] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-gray-600">Email</th>
                  <th className="px-6 py-4 text-left text-gray-600">Roles</th>
                  <th className="px-6 py-4 text-left text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {user.roles.map((role) => (
                          <span
                            key={role}
                            className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-700"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full ${
                          user.status === 'Active'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="rounded-lg">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Link href={`/admin/users/edit/${user.id}`}>
                          <Button variant="ghost" size="icon" className="rounded-lg">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="rounded-lg text-orange-600">
                          <UserX className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-lg text-blue-600">
                          <KeyRound className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
