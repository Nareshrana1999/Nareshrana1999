import React, { useMemo } from 'react';
import { BufferGeometry, Vector3 } from 'three';

interface OrbitProps {
  radius: number;
  color: string;
  parentPosition?: [number, number, number];
  segments?: number;
}

const Orbit: React.FC<OrbitProps> = ({ 
  radius, 
  color, 
  parentPosition = [0, 0, 0],
  segments = 128 
}) => {
  const points = useMemo(() => {
    const pts: Vector3[] = [];
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius + parentPosition[0];
      const y = parentPosition[1];
      const z = Math.sin(angle) * radius + parentPosition[2];
      pts.push(new Vector3(x, y, z));
    }
    
    return pts;
  }, [radius, parentPosition, segments]);

  const geometry = useMemo(() => {
    const geometry = new BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <line>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial 
        attach="material"
        color={color} 
        transparent 
        opacity={0.3} 
      />
    </line>
  );
};

export default Orbit;