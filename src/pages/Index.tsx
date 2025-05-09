
import React from 'react';
import Dashboard from '@/components/Dashboard';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

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
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4 text-blue-500" />
          <AlertTitle>Demo Mode</AlertTitle>
          <AlertDescription>
            This is running in simulation mode with randomly generated device data. In a real environment, 
            you would connect to the backend server running on http://localhost:5000.
          </AlertDescription>
        </Alert>
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
