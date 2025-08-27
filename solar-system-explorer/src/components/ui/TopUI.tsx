import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  Box,
  Tooltip
} from '@mui/material';
import {
  RadioButtonChecked,
  Label,
  Settings,
  Info
} from '@mui/icons-material';
import { AppState } from '../../App';

interface TopUIProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

const TopUI: React.FC<TopUIProps> = ({ appState, updateAppState }) => {
  return (
    <AppBar 
      position="absolute" 
      sx={{ 
        top: 0, 
        zIndex: 10,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          🌌 Solar System Explorer
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* View Options */}
          <FormControlLabel
            control={
              <Switch
                checked={appState.showOrbits}
                onChange={(e) => updateAppState({ showOrbits: e.target.checked })}
                size="small"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <RadioButtonChecked fontSize="small" />
                Orbits
              </Box>
            }
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={appState.showLabels}
                onChange={(e) => updateAppState({ showLabels: e.target.checked })}
                size="small"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Label fontSize="small" />
                Labels
              </Box>
            }
          />
          
          {/* Action Buttons */}
          <Tooltip title="View Settings">
            <IconButton color="inherit">
              <Settings />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="About">
            <IconButton color="inherit">
              <Info />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopUI;