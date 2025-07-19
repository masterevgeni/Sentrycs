import { ThemeProvider, CssBaseline } from '@mui/material';
import WordGame from './pages/WorldGame/WordGame';
import {theme} from './theme/theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <WordGame />
      </div>
    </ThemeProvider>
  );
}

export default App;