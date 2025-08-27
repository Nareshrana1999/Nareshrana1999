import React from 'react';
import {
  Paper,
  Box,
  IconButton,
  Slider,
  Typography,
  Tooltip,
  Chip
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  Speed
} from '@mui/icons-material';
import { AppState } from '../../App';

interface TimeControlsProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

const TimeControls: React.FC<TimeControlsProps> = ({ appState, updateAppState }) => {
  const minDate = new Date('1949-01-01');
  const maxDate = new Date('2049-12-31');
  
  const dateToValue = (date: Date) => {
    return date.getTime();
  };
  
  const valueToDate = (value: number) => {
    return new Date(value);
  };

  const handleDateChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      updateAppState({ currentDate: valueToDate(newValue) });
    }
  };

  const handleSpeedChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      updateAppState({ timeSpeed: newValue });
    }
  };

  const togglePlayPause = () => {
    updateAppState({ isPlaying: !appState.isPlaying });
  };

  const jumpToToday = () => {
    updateAppState({ currentDate: new Date() });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSpeedLabel = () => {
    if (appState.timeSpeed === 1) return 'Real Time';
    if (appState.timeSpeed < 1) return `${appState.timeSpeed}x Slow`;
    return `${appState.timeSpeed}x Fast`;
  };

  return (
    <Paper
      sx={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        p: 2,
        minWidth: 600,
        background: 'rgba(18, 18, 18, 0.9)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Date Display and Today Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {formatDate(appState.currentDate)}
          </Typography>
          <Chip
            label="Today"
            onClick={jumpToToday}
            variant="outlined"
            size="small"
            clickable
          />
        </Box>
        
        {/* Time Slider */}
        <Box sx={{ px: 2 }}>
          <Slider
            value={dateToValue(appState.currentDate)}
            min={dateToValue(minDate)}
            max={dateToValue(maxDate)}
            onChange={handleDateChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatDate(valueToDate(value))}
            sx={{
              '& .MuiSlider-thumb': {
                width: 20,
                height: 20,
              },
              '& .MuiSlider-track': {
                height: 4,
              },
              '& .MuiSlider-rail': {
                height: 4,
              }
            }}
          />
        </Box>
        
        {/* Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
          {/* Speed Control */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 150 }}>
            <Speed fontSize="small" />
            <Slider
              value={appState.timeSpeed}
              min={0.1}
              max={100}
              step={0.1}
              onChange={handleSpeedChange}
              sx={{ width: 100 }}
              scale={(value) => value}
            />
            <Typography variant="caption" sx={{ minWidth: 60 }}>
              {getSpeedLabel()}
            </Typography>
          </Box>
          
          {/* Playback Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Previous Year">
              <IconButton
                onClick={() => {
                  const newDate = new Date(appState.currentDate);
                  newDate.setFullYear(newDate.getFullYear() - 1);
                  updateAppState({ currentDate: newDate });
                }}
              >
                <SkipPrevious />
              </IconButton>
            </Tooltip>
            
            <Tooltip title={appState.isPlaying ? 'Pause' : 'Play'}>
              <IconButton onClick={togglePlayPause} color="primary">
                {appState.isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Next Year">
              <IconButton
                onClick={() => {
                  const newDate = new Date(appState.currentDate);
                  newDate.setFullYear(newDate.getFullYear() + 1);
                  updateAppState({ currentDate: newDate });
                }}
              >
                <SkipNext />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default TimeControls;