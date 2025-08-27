import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

import SolarSystem from './components/3d/SolarSystem';
import TopUI from './components/ui/TopUI';
import InfoPanel from './components/ui/InfoPanel';
import TimeControls from './components/ui/TimeControls';
import LoadingScreen from './components/ui/LoadingScreen';

import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(18, 18, 18, 0.9)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

export interface AppState {
  selectedObject: string | null;
  currentDate: Date;
  timeSpeed: number;
  isPlaying: boolean;
  showOrbits: boolean;
  showLabels: boolean;
  cameraTarget: string | null;
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    selectedObject: null,
    currentDate: new Date(),
    timeSpeed: 1,
    isPlaying: false,
    showOrbits: true,
    showLabels: true,
    cameraTarget: null,
  });

  const updateAppState = (updates: Partial<AppState>) => {
    setAppState(prev => ({ ...prev, ...updates }));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App" style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: 'linear-gradient(to bottom, #000428, #004e92)' }}>
        {/* Top UI */}
        <TopUI appState={appState} updateAppState={updateAppState} />
        
        {/* Main 3D Canvas */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <Canvas
            camera={{ position: [0, 10, 30], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <pointLight position={[0, 0, 0]} intensity={1.5} color="#ffd700" />
              
              {/* Background */}
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={0.5}
              />
              
              {/* Test sphere to ensure 3D is working */}
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[3, 32, 32]} />
                <meshBasicMaterial color="#ffd700" />
              </mesh>
              
              {/* Camera Controls */}
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                zoomSpeed={0.5}
                panSpeed={0.5}
                rotateSpeed={0.3}
                minDistance={5}
                maxDistance={500}
              />
              
              {/* Main Solar System */}
              <SolarSystem
                appState={appState}
                updateAppState={updateAppState}
              />
            </Suspense>
          </Canvas>
        </Box>
        
        {/* Bottom Time Controls */}
        <TimeControls appState={appState} updateAppState={updateAppState} />
        
        {/* Info Panel */}
        {appState.selectedObject && (
          <InfoPanel
            selectedObject={appState.selectedObject}
            onClose={() => updateAppState({ selectedObject: null })}
          />
        )}
        
        {/* Loading Screen */}
        <Suspense fallback={<LoadingScreen />}>
          <div style={{ display: 'none' }} />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}

export default App;
