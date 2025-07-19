import React from 'react';
import { Box, styled } from '@mui/material';

interface WordSquareProps {
  letter: string;
  status: 'empty' | 'filled' | 'valid' | 'invalid';
  index: number;
}

const SquareBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status'
})<{ status: string }>(({ theme, status }) => ({
  width: 60,
  height: 60,
  border: `3px solid ${
    status === 'valid' 
      ? theme.palette.success.main 
      : status === 'invalid' 
        ? theme.palette.error.main 
        : theme.palette.grey[400]
  }`,
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  backgroundColor: status === 'filled' ? theme.palette.grey[100] : 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: status === 'empty' ? theme.palette.primary.main : undefined,
  },
}));

const WordSquare: React.FC<WordSquareProps> = ({ letter, status, index }) => {
  return (
    <SquareBox status={status}>
      {letter}
    </SquareBox>
  );
};

export default WordSquare;