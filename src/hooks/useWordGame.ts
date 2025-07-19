import { useState, useEffect, useCallback } from 'react';
import { MyActionListener } from './../services/ActionListener';

export const useWordGame = () => {
  const [characters, setCharacters] = useState<string[]>(Array(5).fill(''));
  const [status, setStatus] = useState<'empty' | 'filled' | 'valid' | 'invalid'>('empty');
  const [message, setMessage] = useState('Enter a 5-letter word');
  const [messageType, setMessageType] = useState<'default' | 'success' | 'error'>('default');
  const [actionListener] = useState(() => new MyActionListener());

  const checkWordInDictionary = async (word: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
      return response.ok;
    } catch (error) {
      const commonWords = [
        'HELLO', 'WORLD', 'REACT', 'WORDS', 'GAMES', 'HOUSE', 'WATER', 'LIGHT', 
        'MUSIC', 'BOOKS', 'HAPPY', 'CHAIR', 'TABLE', 'MOUSE', 'PHONE'
      ];
      return commonWords.includes(word.toUpperCase());
    }
  };

  const addCharacter = useCallback((char: string) => {
    const emptyIndex = characters.findIndex(c => c === '');
    if (emptyIndex !== -1) {
      const newCharacters = [...characters];
      newCharacters[emptyIndex] = char;
      setCharacters(newCharacters);
      setStatus('filled');
      setMessage('Keep typing or press Enter when done');
      setMessageType('default');
    }
  }, [characters]);

  const removeCharacter = useCallback(() => {
    const lastFilledIndex = characters.reduce((lastIndex, char, index) => {
      return char !== '' ? index : lastIndex;
    }, -1);
    
    if (lastFilledIndex !== -1) {
      const newCharacters = [...characters];
      newCharacters[lastFilledIndex] = '';
      setCharacters(newCharacters);
      setStatus('filled');
      setMessage(newCharacters.every(c => c === '') ? 'Enter a 5-letter word' : 'Keep typing...');
      setMessageType('default');
    }
  }, [characters]);

  const checkWord = useCallback(async () => {
    const word = characters.join('');
    if (word.length === 5) {
      const isValid = await checkWordInDictionary(word);
      if (isValid) {
        setStatus('valid');
        setMessage(`"${word}" is a valid word! 🎉`);
        setMessageType('success');
      } else {
        setStatus('invalid');
        setMessage(`"${word}" is not in the dictionary. Try again!`);
        setMessageType('error');
      }
    }
  }, [characters]);

  const resetGame = useCallback(() => {
    setCharacters(Array(5).fill(''));
    setStatus('empty');
    setMessage('Enter a 5-letter word');
    setMessageType('default');
  }, []);

  // Setup action listeners
  useEffect(() => {
    actionListener.registerListener('ADD_CHARACTER', addCharacter);
    actionListener.registerListener('REMOVE_CHARACTER', removeCharacter);
    actionListener.registerListener('CHECK_WORD', checkWord);
    actionListener.registerListener('RESET_GAME', resetGame);

    return () => {
      actionListener.removeListener('ADD_CHARACTER');
      actionListener.removeListener('REMOVE_CHARACTER');
      actionListener.removeListener('CHECK_WORD');
      actionListener.removeListener('RESET_GAME');
    };
  }, [actionListener, addCharacter, removeCharacter, checkWord, resetGame]);

  const handleCharacterClick = (char: string) => {
    actionListener.emit('ADD_CHARACTER', char);
  };

  const handleBackspace = () => {
    actionListener.emit('REMOVE_CHARACTER', null);
  };

  const handleEnter = () => {
    const word = characters.join('');
    if (word.length === 5) {
      actionListener.emit('CHECK_WORD', null);
    }
  };

  const handleReset = () => {
    actionListener.emit('RESET_GAME', null);
  };

  return {
    characters,
    status,
    message,
    messageType,
    handleCharacterClick,
    handleBackspace,
    handleEnter,
    handleReset
  };
};