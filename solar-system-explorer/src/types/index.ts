export interface CelestialBody {
  id: string;
  name: string;
  type: 'planet' | 'moon' | 'dwarf-planet' | 'asteroid' | 'comet';
  parent?: string;
  radius: number;
  distance: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  texture?: string;
  color: string;
  position: [number, number, number];
  velocity: [number, number, number];
  description: string;
  facts: string[];
  nasaLink?: string;
}

export interface Spacecraft {
  id: string;
  name: string;
  launchDate: Date;
  mission: string;
  status: 'active' | 'inactive' | 'planned';
  position: [number, number, number];
  velocity: [number, number, number];
  target?: string;
  description: string;
  facts: string[];
  nasaLink?: string;
}

export interface Mission {
  id: string;
  name: string;
  spacecraft: string[];
  startDate: Date;
  endDate?: Date;
  description: string;
  highlights: string[];
  trajectory: [number, number, number][];
}

export interface TimeRange {
  start: Date;
  end: Date;
  current: Date;
}

export interface ViewSettings {
  showOrbits: boolean;
  showLabels: boolean;
  showAtmospheres: boolean;
  showTrajectories: boolean;
  renderQuality: 'low' | 'medium' | 'high';
}

export interface CameraState {
  position: [number, number, number];
  target: [number, number, number];
  following?: string;
  mode: 'free' | 'follow' | 'locked';
}