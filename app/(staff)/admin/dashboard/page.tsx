import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Total Products',
      value: '1,248',
      icon: Package,
      color: 'bg-blue-50 text-[#3A7AFE]',
    },
    {
      title: 'Total Users',
      value: '3,567',
      icon: Users,
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Pending Orders',
      value: '42',
      icon: ShoppingCart,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Revenue',
      value: '$124,500',
      icon: DollarSign,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-gray-900 text-2xl">Dashboard</div>
        <div className="text-gray-500 mt-1">Welcome back to AIMS</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-600">{stat.title}</div>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="text-gray-900 text-3xl">{stat.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
