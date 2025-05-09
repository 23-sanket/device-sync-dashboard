import React, { useState, useEffect } from 'react';
import DeviceCard from './DeviceCard';
import DeviceCharts from './DeviceCharts';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [devices, setDevices] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  // Store historical data for charts
  const [deviceHistory, setDeviceHistory] = useState<{
    D1: { voltage: any[], current: any[], temperature: any[] },
    D2: { voltage: any[], current: any[], temperature: any[] }
  }>({
    D1: { voltage: [], current: [], temperature: [] },
    D2: { voltage: [], current: [], temperature: [] }
  });

  const { toast } = useToast();

  // Generate random number within a range
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Generate simulated device data
  const generateDeviceData = () => {
    return [
      `D1V${getRandomNumber(40, 60)}C${getRandomNumber(15, 30)}T${getRandomNumber(20, 40)}`,
      `D2V${getRandomNumber(45, 65)}C${getRandomNumber(20, 35)}T${getRandomNumber(25, 45)}`
    ];
  };

  // Function to fetch or simulate device data
  const fetchDeviceData = async () => {
    try {
      // In this preview environment, we'll simulate the data instead of fetching from backend
      const simulatedData = generateDeviceData();
      setDevices(simulatedData);
      
      // Update device history for charts
      updateDeviceHistory(simulatedData);
      
      // If was previously in error state
      if (error) {
        setError(null);
        toast({
          title: "Connected",
          description: "Successfully connected to the device monitor.",
          variant: "default",
        });
      }
      
      setLoading(false);
    } catch (err) {
      setError(`Failed to get device data. ${err instanceof Error ? err.message : ''}`);
      setLoading(false);
    }
  };

  // Parse device data string and update history
  const updateDeviceHistory = (devicesData: string[]) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    devicesData.forEach(deviceString => {
      const regex = /D(\d+)V(\d+)C(\d+)T(\d+)/;
      const match = deviceString.match(regex);
      
      if (match) {
        const deviceId = `D${match[1]}`;
        const voltage = parseInt(match[2], 10);
        const current = parseInt(match[3], 10);
        const temperature = parseInt(match[4], 10);
        
        if (deviceId === 'D1' || deviceId === 'D2') {
          setDeviceHistory(prevHistory => {
            // Keep only the last 10 readings
            const newVoltage = [...prevHistory[deviceId].voltage, { time: currentTime, value: voltage }].slice(-15);
            const newCurrent = [...prevHistory[deviceId].current, { time: currentTime, value: current }].slice(-15);
            const newTemperature = [...prevHistory[deviceId].temperature, { time: currentTime, value: temperature }].slice(-15);
            
            return {
              ...prevHistory,
              [deviceId]: {
                voltage: newVoltage,
                current: newCurrent,
                temperature: newTemperature
              }
            };
          });
        }
      }
    });
  };

  // Fetch data initially and every 2 seconds
  useEffect(() => {
    fetchDeviceData();
    
    const intervalId = setInterval(() => {
      fetchDeviceData();
    }, 2000);
    
    // Clean up
    return () => clearInterval(intervalId);
  }, []);

  // Filter devices based on active tab
  const filteredDevices = activeTab === "all" 
    ? devices 
    : devices.filter(device => device.startsWith("D2"));

  if (loading && devices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-purple-500 animate-spin mb-4" />
        <p className="text-gray-600">Connecting to device monitor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Connection Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <Button onClick={fetchDeviceData} variant="outline" size="sm">
                  Retry Connection
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-left">
          <h2 className="text-xl font-semibold mb-3">Troubleshooting Steps:</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Make sure the backend server is running on port 5000</li>
            <li>Check if there are any console errors in the terminal running the backend</li>
            <li>Verify that CORS is enabled on the backend</li>
            <li>Ensure there are no firewall settings blocking the connection</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Device Monitor</h1>
        <Button 
          onClick={fetchDeviceData} 
          variant="outline" 
          size="sm"
          className="text-purple-600 border-purple-300 hover:bg-purple-50"
        >
          Refresh Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Devices</TabsTrigger>
          <TabsTrigger value="d2">Device D2</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredDevices.map((device, index) => (
              <DeviceCard key={index} deviceData={device} />
            ))}
            {filteredDevices.length === 0 && (
              <div className="col-span-2 text-center py-12 text-gray-500">
                No device data available
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="d2">
          <div className="max-w-2xl mx-auto">
            {filteredDevices.map((device, index) => (
              <DeviceCard key={index} deviceData={device} />
            ))}
            {filteredDevices.length > 0 && (
              <DeviceCharts deviceData={deviceHistory.D2} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
