import React from 'react';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Divider
} from '@mui/material';
import { Close, OpenInNew } from '@mui/icons-material';
import { getPlanetByID } from '../../data/celestialBodies';

interface InfoPanelProps {
  selectedObject: string;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedObject, onClose }) => {
  const body = getPlanetByID(selectedObject);
  
  if (!body) return null;

  const formatDistance = (distance: number) => {
    if (distance === 0) return 'Center of Solar System';
    const au = distance / 1.496e11; // Convert to AU
    return `${au.toFixed(2)} AU (${(distance / 1e9).toFixed(0)} million km)`;
  };

  const formatRadius = (radius: number) => {
    const earthRadii = radius / 6.371e6;
    return `${(radius / 1000).toFixed(0)} km (${earthRadii.toFixed(2)}× Earth)`;
  };

  const formatPeriod = (days: number) => {
    if (days === 0) return 'N/A';
    if (days < 1) return `${(days * 24).toFixed(1)} hours`;
    if (days < 365) return `${days.toFixed(1)} days`;
    return `${(days / 365.25).toFixed(1)} years`;
  };

  return (
    <Paper
      sx={{
        position: 'absolute',
        top: 80,
        right: 20,
        zIndex: 10,
        width: 400,
        maxHeight: 'calc(100vh - 200px)',
        overflow: 'auto',
        background: 'rgba(18, 18, 18, 0.95)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            {body.name}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
        
        {/* Type Chip */}
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={body.type.charAt(0).toUpperCase() + body.type.slice(1)} 
            color="primary" 
            size="small" 
          />
        </Box>
        
        {/* Description */}
        <Typography variant="body1" sx={{ mb: 3 }}>
          {body.description}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Key Facts */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Key Facts
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Radius:</strong> {formatRadius(body.radius)}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Distance from {body.parent || 'Sun'}:</strong> {formatDistance(body.distance)}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Orbital Period:</strong> {formatPeriod(body.orbitalPeriod)}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            <strong>Rotation Period:</strong> {formatPeriod(Math.abs(body.rotationPeriod / 24))}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Interesting Facts */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Did You Know?
        </Typography>
        
        <List dense>
          {body.facts.map((fact, index) => (
            <ListItem key={index} sx={{ px: 0 }}>
              <ListItemText 
                primary={fact}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </List>
        
        {/* NASA Link */}
        {body.nasaLink && (
          <Box sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<OpenInNew />}
              href={body.nasaLink}
              target="_blank"
              rel="noopener noreferrer"
              fullWidth
            >
              Learn More on NASA
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default InfoPanel;