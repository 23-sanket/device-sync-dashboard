
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Generate random number within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate device data in format DxVxxCyyTzz
const generateDeviceData = () => {
  const devices = [
    `D1V${getRandomNumber(40, 60)}C${getRandomNumber(15, 30)}T${getRandomNumber(20, 40)}`,
    `D2V${getRandomNumber(45, 65)}C${getRandomNumber(20, 35)}T${getRandomNumber(25, 45)}`
  ];
  
  return devices;
};

// Endpoint to get device data
app.get('/api/devices', (req, res) => {
  const deviceData = generateDeviceData();
  res.json(deviceData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('Device monitoring simulation active...');
});
