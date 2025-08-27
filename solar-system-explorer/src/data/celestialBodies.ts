import { CelestialBody } from '../types';

export const celestialBodies: CelestialBody[] = [
  {
    id: 'sun',
    name: 'Sun',
    type: 'planet',
    radius: 6.96e8,
    distance: 0,
    orbitalPeriod: 0,
    rotationPeriod: 25.05,
    color: '#ffd700',
    position: [0, 0, 0],
    velocity: [0, 0, 0],
    description: 'The Sun is the star at the center of our Solar System.',
    facts: [
      'Contains 99.86% of the mass of the Solar System',
      'Surface temperature: ~5,778 K (5,505 °C)',
      'Core temperature: ~15 million °C',
      'Composed of ~73% hydrogen and ~25% helium'
    ],
    nasaLink: 'https://solarsystem.nasa.gov/solar-system/sun/'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'planet',
    radius: 2.44e6,
    distance: 5.79e10,
    orbitalPeriod: 88,
    rotationPeriod: 1407.6,
    color: '#8c7853',
    position: [58, 0, 0],
    velocity: [0, 0, 47.87],
    description: 'Mercury is the smallest planet and closest to the Sun.',
    facts: [
      'Smallest planet in our Solar System',
      'One day on Mercury lasts 59 Earth days',
      'No atmosphere and extreme temperature variations',
      'Heavily cratered surface similar to the Moon'
    ],
    nasaLink: 'https://solarsystem.nasa.gov/planets/mercury/'
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    radius: 6.05e6,
    distance: 1.08e11,
    orbitalPeriod: 225,
    rotationPeriod: -5832.5,
    color: '#ffc649',
    position: [108, 0, 0],
    velocity: [0, 0, 35.02],
    description: 'Venus is the hottest planet in our Solar System.',
    facts: [
      'Hottest planet with surface temperature of 462°C',
      'Rotates backwards compared to most planets',
      'Thick atmosphere composed mainly of carbon dioxide',
      'Often called Earth\'s "twin" due to similar size'
    ],
    nasaLink: 'https://solarsystem.nasa.gov/planets/venus/'
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    radius: 6.37e6,
    distance: 1.50e11,
    orbitalPeriod: 365.25,
    rotationPeriod: 24,
    color: '#6b93d6',
    position: [150, 0, 0],
    velocity: [0, 0, 29.78],
    description: 'Earth is our home planet and the only known planet with life.',
    facts: [
      'Only known planet with life',
      '71% of surface covered by water',
      'Has one natural satellite (the Moon)',
      'Atmosphere is 78% nitrogen and 21% oxygen'
    ],
    nasaLink: 'https://solarsystem.nasa.gov/planets/earth/'
  },
  {
    id: 'moon',
    name: 'Moon',
    type: 'moon',
    parent: 'earth',
    radius: 1.74e6,
    distance: 3.84e8,
    orbitalPeriod: 27.3,
    rotationPeriod: 27.3,
    color: '#c0c0c0',
    position: [150.38, 0, 0],
    velocity: [0, 0, 30.8],
    description: 'The Moon is Earth\'s only natural satellite.',
    facts: [
      'Fifth largest moon in the Solar System',
      'Causes tides on Earth due to gravitational pull',
      'Always shows the same face to Earth (tidally locked)',
      'Formed about 4.5 billion years ago'
    ],
    nasaLink: 'https://solarsystem.nasa.gov/moons/earths-moon/'
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    radius: 3.39e6,
    distance: 2.28e11,
    orbitalPeriod: 687,
    rotationPeriod: 24.6,
    color: '#cd5c5c',
    position: [228, 0, 0],
    velocity: [0, 0, 24.07],
    description: 'Mars is known as the Red Planet due to iron oxide on its surface.',
    facts: [
      'Known as the "Red Planet" due to iron oxide',
      'Has the largest volcano in the Solar System (Olympus Mons)',
      'Has two small moons: Phobos and Deimos',
      'Evidence suggests it once had liquid water'
    ],
    nasaLink: 'https://solarsystem.nasa.gov/planets/mars/'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    radius: 7.15e7,
    distance: 7.79e11,
    orbitalPeriod: 4333,
    rotationPeriod: 9.9,
    color: '#d8ca9d',
    position: [779, 0, 0],
    velocity: [0, 0, 13.07],
    description: 'Jupiter is the largest planet in our Solar System.',
    facts: [
      'Largest planet in our Solar System',
      'Has at least 95 known moons',
      'The Great Red Spot is a storm larger than Earth',
      'Composed mainly of hydrogen and helium'
    ],
    nasaLink: 'https://solarsystem.nasa.gov/planets/jupiter/'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'planet',
    radius: 6.03e7,
    distance: 1.43e12,
    orbitalPeriod: 10759,
    rotationPeriod: 10.7,
    color: '#fab27b',
    position: [1432, 0, 0],
    velocity: [0, 0, 9.68],
    description: 'Saturn is famous for its prominent ring system.',
    facts: [
      'Famous for its prominent ring system',
      'Has at least 146 known moons',
      'Less dense than water',
      'Titan is its largest moon with a thick atmosphere'
    ],
    nasaLink: 'https://solarsystem.nasa.gov/planets/saturn/'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'planet',
    radius: 2.56e7,
    distance: 2.87e12,
    orbitalPeriod: 30687,
    rotationPeriod: -17.2,
    color: '#4fd0e7',
    position: [2867, 0, 0],
    velocity: [0, 0, 6.80],
    description: 'Uranus rotates on its side and has a faint ring system.',
    facts: [
      'Rotates on its side at a 98-degree angle',
      'Has faint rings discovered in 1977',
      'Coldest planetary atmosphere in the Solar System',
      'Has 27 known moons'
    ],
    nasaLink: 'https://solarsystem.nasa.gov/planets/uranus/'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'planet',
    radius: 2.46e7,
    distance: 4.50e12,
    orbitalPeriod: 60190,
    rotationPeriod: 16.1,
    color: '#4b70dd',
    position: [4515, 0, 0],
    velocity: [0, 0, 5.43],
    description: 'Neptune is the windiest planet with speeds up to 2,100 km/h.',
    facts: [
      'Windiest planet with speeds up to 2,100 km/h',
      'Has 16 known moons',
      'Takes 165 Earth years to orbit the Sun',
      'Discovered through mathematical predictions'
    ],
    nasaLink: 'https://solarsystem.nasa.gov/planets/neptune/'
  }
];

export const getPlanetByID = (id: string): CelestialBody | undefined => {
  return celestialBodies.find(body => body.id === id);
};

export const getPlanets = (): CelestialBody[] => {
  return celestialBodies.filter(body => body.type === 'planet' && body.id !== 'sun');
};

export const getMoons = (): CelestialBody[] => {
  return celestialBodies.filter(body => body.type === 'moon');
};