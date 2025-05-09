
# Device Sync Dashboard

A simple desktop application that simulates live monitoring of two devices (D1 and D2) by reading mock data from a local backend server.

## Project Structure

```
device-sync-dashboard/
├── src/
│   ├── backend/          # Express server for mock data
│   │   ├── server.js
│   │   └── package.json
│   ├── components/       # React components
│   │   ├── Dashboard.tsx
│   │   ├── DeviceCard.tsx
│   │   ├── DeviceChart.tsx
│   │   └── DeviceCharts.tsx
│   ├── electron/         # Electron integration
│   │   ├── main.js
│   │   └── package.json
│   └── pages/
│       ├── Index.tsx     # Main app page
│       └── NotFound.tsx  # 404 page
└── README.md
```

## Features

- Real-time device monitoring simulation
- Display of device data (voltage, current, temperature)
- Visualization using charts
- Filter view by device
- Desktop application via Electron

## Installation & Setup

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd src/backend
npm install
```

### 2. Frontend Setup

The frontend is already set up with React. Make sure to install all dependencies from the root directory:

```bash
npm install
```

### 3. Electron Setup

Navigate to the electron directory and install dependencies:

```bash
cd src/electron
npm install
```

## Running the Application

### Step 1: Start the Backend Server

```bash
cd src/backend
npm start
```

This will start the Express server on http://localhost:5000.

### Step 2: Start the React Frontend

From the project root directory:

```bash
npm run dev
```

This will start the React development server on http://localhost:3000.

### Step 3: Launch as Desktop Application (Optional)

With both the backend and frontend running, open a new terminal:

```bash
cd src/electron
npm start
```

This will launch the application as a desktop app using Electron.

## Development Notes

- The backend generates random values every 2 seconds to simulate device readings
- The frontend fetches these values and parses them to display in a user-friendly format
- Data format: "DxVxxCyyTzz" where:
  - D + number = Device ID (D1 or D2)
  - V + number = Voltage value
  - C + number = Current value
  - T + number = Temperature value

## Troubleshooting

### Backend Connection Issues
- Make sure the backend server is running on port 5000
- Check for any CORS errors in the browser console
- Verify there are no firewall settings blocking the connection

### Frontend Display Issues
- Clear browser cache and reload the page
- Check browser console for any JavaScript errors

### Electron Issues
- Ensure both the backend and frontend are running before starting Electron
- Check the Electron logs for any errors

## License

MIT
