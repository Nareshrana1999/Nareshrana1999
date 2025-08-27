import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, #000428, #004e92)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        color: 'white'
      }}
    >
      <CircularProgress size={60} sx={{ mb: 3 }} />
      <Typography variant="h5" sx={{ mb: 2 }}>
        Loading Solar System...
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.7 }}>
        Initializing 3D visualization
      </Typography>
    </Box>
  );
};

export default LoadingScreen;