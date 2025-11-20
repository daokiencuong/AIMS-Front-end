'use client';
import { Button } from '@/src/components/ui/button';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditUser({ userId }: { userId: string }) {
  const router = useRouter();
  const id = userId;
  const isEdit = true;

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const roles = ['Admin', 'Product Manager', 'User', 'Sales'];

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const handleSubmit = () => {
    router.push('/admin/users');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <div className="text-gray-900 text-2xl">
          {isEdit ? 'Edit User' : 'Create New User'}
        </div>
        <div className="text-gray-500 mt-1">
          {isEdit ? 'Update user information' : 'Add a new user to the system'}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter full name"
              defaultValue={isEdit ? id : ''}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              defaultValue={isEdit ? 'john@aims.com' : ''}
              className="rounded-lg"
            />
          </div>
        </div>

        {!isEdit && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              className="rounded-lg"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Roles</Label>
          <div className="grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
            {roles.map((role) => (
              <div key={role} className="flex items-center space-x-2">
                <Checkbox
                  id={role}
                  checked={selectedRoles.includes(role)}
                  onCheckedChange={() => toggleRole(role)}
                />
                <label htmlFor={role} className="text-gray-900 cursor-pointer">
                  {role}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={isEdit ? 'active' : 'active'}>
            <SelectTrigger className="rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-blue-800">
            System will send notification email automatically to the user after{' '}
            {isEdit ? 'update' : 'creation'}.
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => router.push('/admin/users')}
          className="rounded-lg px-8 py-6"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] px-8 py-6"
        >
          {isEdit ? 'Update User' : 'Create User'}
        </Button>
      </div>
    </div>
  );
}
