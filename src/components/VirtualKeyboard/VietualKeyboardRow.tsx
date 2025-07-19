import React from 'react';
import { Box } from '@mui/material';
import { Backspace } from '@mui/icons-material';
import { KeyButton, SpecialKeyButton } from './StyledComponents';
import { VirtualKeyboardRowProps } from '../../types';
import './styles/styles.css'; 

const KeyboardRow: React.FC<VirtualKeyboardRowProps> = ({
  row,
  rowIndex,
  onLetterClick,
  onBackspace,
  onEnter,
  disabled = false,
}) => {
  return (
    <Box key={rowIndex} className="keyboard-row">
      {rowIndex === 2 && (
        <SpecialKeyButton
          onClick={onEnter}
          disabled={disabled}
          sx={{ mr: 1 }}
        >
          ENTER
        </SpecialKeyButton>
      )}
      {row.map((letter) => (
        <KeyButton
          key={letter}
          onClick={() => onLetterClick(letter)}
          disabled={disabled}
        >
          {letter}
        </KeyButton>
      ))}
      {rowIndex === 2 && (
        <SpecialKeyButton
          onClick={onBackspace}
          disabled={disabled}
          sx={{ ml: 1 }}
        >
          <Backspace />
        </SpecialKeyButton>
      )}
    </Box>
  );
};

export default KeyboardRow;
