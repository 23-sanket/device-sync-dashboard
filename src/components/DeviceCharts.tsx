
import React from 'react';
import DeviceChart from './DeviceChart';

interface DeviceChartsProps {
  deviceData: {
    voltage: { time: string; value: number }[];
    current: { time: string; value: number }[];
    temperature: { time: string; value: number }[];
  };
}

const DeviceCharts = ({ deviceData }: DeviceChartsProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 mt-4">
      <DeviceChart 
        data={deviceData.voltage} 
        title="Voltage" 
        color="#3b82f6" 
        unit="V"
      />
      <DeviceChart 
        data={deviceData.current} 
        title="Current" 
        color="#f59e0b" 
        unit="A"
      />
      <DeviceChart 
        data={deviceData.temperature} 
        title="Temperature" 
        color="#ef4444" 
        unit="°C"
      />
    </div>
  );
};

export default DeviceCharts;
