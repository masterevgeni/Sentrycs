import React from 'react';
import { Box } from '@mui/material';
import KeyboardRow from './VietualKeyboardRow';
import { KEYBOARD_ROWS } from './VirtualKeyboardLetters';
import './styles/styles.css';

interface VirtualKeyboardProps {
  onLetterClick: (letter: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  disabled?: boolean;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ 
  onLetterClick, 
  onBackspace, 
  onEnter, 
  disabled = false 
}) => {
  return (
    <Box className="keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <KeyboardRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          onLetterClick={onLetterClick}
          onBackspace={onBackspace}
          onEnter={onEnter}
          disabled={disabled}
        />
      ))}
    </Box>
  );
};

export default VirtualKeyboard;
