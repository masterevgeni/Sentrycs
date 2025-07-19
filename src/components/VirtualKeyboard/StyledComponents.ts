import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const KeyButton = styled(Button)(({ theme }) => ({
  minWidth: 40,
  minHeight: 50,
  fontSize: '16px',
  fontWeight: 'bold',
  margin: theme.spacing(0.25),
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
  '&:active': {
    backgroundColor: theme.palette.grey[400],
  }
}));

export const SpecialKeyButton = styled(KeyButton)(({ theme }) => ({
  minWidth: 80,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));