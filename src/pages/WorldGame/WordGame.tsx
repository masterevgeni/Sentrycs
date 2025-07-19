import React from 'react';
import { Container, Typography, Box, Paper, Alert } from '@mui/material';
import WordSquare from '../../components/WordSquare/WordSquare';
import VirtualKeyboard from '../../components/VirtualKeyboard/VirtualKeyboard';
import { useWordGame } from '../../hooks/useWordGame';
import './styles/styles.css';

const WordGame: React.FC = () => {
  const {
    characters,
    status,
    message,
    messageType,
    handleCharacterClick,
    handleBackspace,
    handleEnter,
    handleReset
  } = useWordGame();

  const getSquareStatus = (index: number) => {
    if (status === 'valid') return 'valid';
    if (status === 'invalid') return 'invalid';
    if (characters[index]) return 'filled';
    return 'empty';
  };

  const getSeverity = () => {
    switch (messageType) {
      case 'success': return 'success';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} className='paper'>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center"
          className='label'
        >
          Word Validator
        </Typography>
        
        {/* Message Display */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Alert 
            severity={getSeverity()}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontSize: '16px',
                fontWeight: 500
              }
            }}
          >
            {message}
          </Alert>
        </Box>

        {/* Word Squares */}
        <Box className="letters">
          {characters.map((letter, index) => (
            <WordSquare
              key={index}
              letter={letter}
              status={getSquareStatus(index)}
              index={index}
            />
          ))}
        </Box>

        {/* Virtual Keyboard */}
        <VirtualKeyboard
          onLetterClick={handleCharacterClick}
          onBackspace={handleBackspace}
          onEnter={handleEnter}
          disabled={status === 'valid' || status === 'invalid'}
        />

        {/* Reset Button */}
        {(status === 'valid' || status === 'invalid') && (
          <Box className="play-button-box">
            <Paper 
              component="button"
              onClick={handleReset}
              elevation={2}
              className='play-button'
              sx={{
                backgroundColor: 'primary.main',
              '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                },
              }}
            >
              Play Again
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default WordGame;