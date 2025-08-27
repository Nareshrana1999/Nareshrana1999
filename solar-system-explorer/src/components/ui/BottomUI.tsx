import React from 'react';
import { AppState } from '../../App';

interface BottomUIProps {
  appState: AppState;
  updateAppState: (updates: Partial<AppState>) => void;
}

const BottomUI: React.FC<BottomUIProps> = ({ appState, updateAppState }) => {
  // For now, this component is just a placeholder
  // Future features could include:
  // - Quick planet navigation
  // - Mission timeline
  // - Comparison tools
  
  return null;
};

export default BottomUI;