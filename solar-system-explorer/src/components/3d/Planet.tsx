import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Text } from '@react-three/drei';
import { CelestialBody } from '../../types';

interface PlanetProps {
  body: CelestialBody;
  scale: number;
  onSelect: (id: string) => void;
  isSelected: boolean;
  showLabel: boolean;
  parentBody?: CelestialBody;
  fixedRadius?: number;
  fixedPosition?: [number, number, number];
}

const Planet: React.FC<PlanetProps> = ({
  body,
  scale,
  onSelect,
  isSelected,
  showLabel,
  parentBody,
  fixedRadius,
  fixedPosition
}) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Calculate scaled radius (with minimum size for visibility)
  const radius = useMemo(() => {
    if (fixedRadius) return fixedRadius;
    
    const scaledRadius = body.radius * scale;
    const minRadius = body.id === 'sun' ? 5 : 0.2; // Increased minimum sizes
    return Math.max(scaledRadius, minRadius);
  }, [body.radius, scale, body.id, fixedRadius]);
  
  // Calculate position
  const position = useMemo(() => {
    if (fixedPosition) return fixedPosition;
    
    if (body.id === 'sun') {
      return [0, 0, 0];
    }
    
    if (parentBody) {
      // Moon position relative to parent planet
      const angle = Date.now() * 0.001 / body.orbitalPeriod;
      const distance = body.distance * scale * 100; // Scale up for visibility
      const parentDistance = parentBody.distance * scale;
      
      return [
        parentDistance + Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance
      ];
    }
    
    // Planet position
    const angle = Date.now() * 0.001 / body.orbitalPeriod;
    const distance = body.distance * scale;
    
    return [
      Math.cos(angle) * distance,
      0,
      Math.sin(angle) * distance
    ];
  }, [body, scale, parentBody, fixedPosition]);

  // Animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate the planet
      meshRef.current.rotation.y += delta / (body.rotationPeriod / 24);
      
      // Pulsing effect when selected
      if (isSelected) {
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
        meshRef.current.scale.setScalar(pulse);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  // Handle click
  const handleClick = (event: any) => {
    event.stopPropagation();
    onSelect(body.id);
  };

  // Material based on body type
  const getMaterial = () => {
    if (body.id === 'sun') {
      return (
        <meshBasicMaterial 
          color={body.color}
          toneMapped={false}
        />
      );
    }
    
    return (
      <meshStandardMaterial 
        color={body.color}
        metalness={0.1}
        roughness={0.8}
      />
    );
  };

  return (
    <group position={position as [number, number, number]} userData={{ isPlanet: true }}>
      {/* Planet mesh */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[radius, 32, 32]} />
        {getMaterial()}
      </mesh>
      
      {/* Rings for Saturn */}
      {body.id === 'saturn' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.2, radius * 2, 64]} />
          <meshStandardMaterial 
            color="#fab27b" 
            transparent 
            opacity={0.6}
            side={2} // DoubleSide
          />
        </mesh>
      )}
      
      {/* Atmosphere for gas giants */}
      {['jupiter', 'saturn', 'uranus', 'neptune'].includes(body.id) && (
        <mesh>
          <sphereGeometry args={[radius * 1.05, 32, 32]} />
          <meshStandardMaterial 
            color={body.color}
            transparent 
            opacity={0.1}
          />
        </mesh>
      )}
      
      {/* Label */}
      {showLabel && (
        <Text
          position={[0, radius + 0.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {body.name}
        </Text>
      )}
      
      {/* Selection indicator */}
      {(isSelected || hovered) && (
        <mesh>
          <sphereGeometry args={[radius * 1.1, 32, 32]} />
          <meshBasicMaterial 
            color={isSelected ? "#00ff00" : "#ffff00"}
            transparent 
            opacity={0.3}
            wireframe
          />
        </mesh>
      )}
    </group>
  );
};

export default Planet;