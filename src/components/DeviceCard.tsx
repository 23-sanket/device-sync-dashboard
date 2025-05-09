
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Battery, Gauge, Thermometer } from "lucide-react";

interface DeviceCardProps {
  deviceData: string;
}

interface ParsedDeviceData {
  id: string;
  voltage: number;
  current: number;
  temperature: number;
}

const DeviceCard = ({ deviceData }: DeviceCardProps) => {
  // Parse the device data string (format: DxVxxCyyTzz)
  const parseDeviceData = (data: string): ParsedDeviceData | null => {
    // Regular expression to match the data format
    const regex = /D(\d+)V(\d+)C(\d+)T(\d+)/;
    const match = data.match(regex);
    
    if (!match) return null;
    
    return {
      id: `D${match[1]}`,
      voltage: parseInt(match[2], 10),
      current: parseInt(match[3], 10),
      temperature: parseInt(match[4], 10)
    };
  };
  
  const parsedData = parseDeviceData(deviceData);
  
  if (!parsedData) {
    return (
      <Card className="mb-4 shadow-md">
        <CardHeader className="bg-red-100 text-red-800">Invalid device data</CardHeader>
        <CardContent className="p-4">
          <p>Could not parse: {deviceData}</p>
        </CardContent>
      </Card>
    );
  }
  
  // Determine temperature status color
  const getTempColor = (temp: number) => {
    if (temp >= 40) return "text-red-500";
    if (temp >= 30) return "text-amber-500";
    return "text-green-500";
  };

  return (
    <Card className="mb-8 shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition-all">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 pb-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-purple-900">{parsedData.id}</h2>
          <span className={`text-sm font-semibold px-2 py-1 rounded-full ${parsedData.id === 'D1' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
            {parsedData.id === 'D1' ? 'Primary' : 'Secondary'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-md">
            <Gauge className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Voltage</p>
              <p className="text-lg font-semibold">{parsedData.voltage} V</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-md">
            <Battery className="h-5 w-5 text-amber-600" />
            <div>
              <p className="text-sm text-gray-500">Current</p>
              <p className="text-lg font-semibold">{parsedData.current} A</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-md">
            <Thermometer className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
              <p className={`text-lg font-semibold ${getTempColor(parsedData.temperature)}`}>
                {parsedData.temperature}°C
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;
