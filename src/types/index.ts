export interface VirtualKeyboardRowProps {
  row: string[];
  rowIndex: number;
  onLetterClick: (letter: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
  disabled?: boolean;
}