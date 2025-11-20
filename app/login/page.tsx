'use client';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginScreen() {
  const route = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    route.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3A7AFE] rounded-xl mb-4">
            <span className="text-white text-2xl">A</span>
          </div>
          <div className="text-gray-900 text-2xl">AIMS</div>
          <div className="text-gray-500 mt-1">Internet Media Store</div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-lg bg-[#3A7AFE] hover:bg-[#2868ee] py-6"
            >
              Log in
            </Button>

            <div className="text-center">
              <a href="#" className="text-[#3A7AFE] hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
