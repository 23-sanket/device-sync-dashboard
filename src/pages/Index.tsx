
import React from 'react';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-3xl font-bold text-purple-700">Device Sync Dashboard</h1>
          <p className="text-gray-600">Real-time device monitoring system</p>
        </div>
      </header>
      <main className="container mx-auto py-8 px-4">
        <Dashboard />
      </main>
      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          Device Sync Dashboard &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
