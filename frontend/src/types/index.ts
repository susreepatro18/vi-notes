export interface LogEvent {
  id: string;
  type: 'system' | 'typing' | 'paste' | 'deletion' | 'timing';
  message: string;
  timestamp: string;
}

export interface WritingStats {
  lastKeyTime: number | null;
  intervals: number[];
  pauseCount: number;
  deletionCount: number;
  pasteCount: number;
  pastedCharCount: number;
}
