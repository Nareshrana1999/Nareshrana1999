import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
import Planet from './Planet';
import Orbit from './Orbit';
import { celestialBodies } from '../../data/celestialBodies';
import { AppState } from '../../App';

interface SolarSystemProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ appState, updateAppState }) => {
  const groupRef = useRef<Group>(null);
  
  // Simplified scale for better visibility
  const planetPositions = [
    { id: 'sun', position: [0, 0, 0], radius: 3 },
    { id: 'mercury', position: [8, 0, 0], radius: 0.3 },
    { id: 'venus', position: [12, 0, 0], radius: 0.4 },
    { id: 'earth', position: [16, 0, 0], radius: 0.4 },
    { id: 'mars', position: [22, 0, 0], radius: 0.35 },
    { id: 'jupiter', position: [35, 0, 0], radius: 1.5 },
    { id: 'saturn', position: [50, 0, 0], radius: 1.2 },
    { id: 'uranus', position: [70, 0, 0], radius: 0.8 },
    { id: 'neptune', position: [85, 0, 0], radius: 0.8 }
  ];

  useFrame((state, delta) => {
    if (appState.isPlaying && groupRef.current) {
      // Simple rotation animation for planets
      groupRef.current.children.forEach((child, index) => {
        if (child.userData.isPlanet && index > 0) {
          const time = state.clock.elapsedTime * appState.timeSpeed * 0.1;
          const distance = planetPositions[index]?.position[0] || 10;
          const speed = 1 / (distance * 0.1); // Closer planets orbit faster
          
          child.position.x = Math.cos(time * speed) * distance;
          child.position.z = Math.sin(time * speed) * distance;
        }
      });
    }
  });

  const handlePlanetClick = (planetId: string) => {
    updateAppState({ selectedObject: planetId });
  };

  return (
    <group ref={groupRef}>
      {planetPositions.map((planetData, index) => {
        const body = celestialBodies.find(b => b.id === planetData.id);
        if (!body) return null;
        
        return (
          <React.Fragment key={planetData.id}>
            {/* Orbit path for planets (not sun) */}
            {planetData.id !== 'sun' && appState.showOrbits && (
              <Orbit
                radius={planetData.position[0]}
                color={body.color}
              />
            )}
            
            {/* Planet */}
            <Planet
              body={body}
              scale={1}
              onSelect={handlePlanetClick}
              isSelected={appState.selectedObject === planetData.id}
              showLabel={appState.showLabels}
              fixedRadius={planetData.radius}
              fixedPosition={planetData.position as [number, number, number]}
            />
          </React.Fragment>
        );
      })}
    </group>
  );
};

export default SolarSystem;