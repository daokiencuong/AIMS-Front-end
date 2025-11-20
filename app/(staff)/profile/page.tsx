'use client';
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { useState } from "react";

export default function Profile() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleProfileUpdate = () => {
    alert('Profile updated successfully');
  };

  return (
    <>
      <div className="space-y-6 max-w-3xl">
        <div>
          <div className="text-gray-900 text-2xl">Profile Settings</div>
          <div className="text-gray-500 mt-1">Manage your account settings</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
              <TabsTrigger
                value="info"
                className="rounded-none border-b-2 data-[state=active]:border-[#3A7AFE]"
              >
                Profile Information
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="rounded-none border-b-2 data-[state=active]:border-[#3A7AFE]"
              >
                Change Password
              </TabsTrigger>
            </TabsList>

            {/* Profile Information Tab */}
            <TabsContent value="info" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    defaultValue="Admin User"
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="admin@aims.com"
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    defaultValue="0123456789"
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    defaultValue="Product Manager"
                    disabled
                    className="rounded-lg bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleProfileUpdate}
                  className="rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] px-8 py-6"
                >
                  Update Profile
                </Button>
              </div>
            </TabsContent>

            {/* Change Password Tab */}
            <TabsContent value="password" className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handlePasswordChange}
                  className="rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] px-8 py-6"
                >
                  Change Password
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
