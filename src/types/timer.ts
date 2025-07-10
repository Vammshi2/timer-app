export interface Timer {
  id: string;
  name: string;
  duration: number; // in seconds
  remainingTime: number;
  category: string;
  status: 'paused' | 'running' | 'completed';
  alertPercentage?: number;
  alertTriggered?: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface TimerHistory {
  id: string;
  name: string;
  category: string;
  duration: number;
  completedAt: Date;
}

export type TimerAction = 
  | { type: 'ADD_TIMER'; payload: Timer }
  | { type: 'UPDATE_TIMER'; payload: { id: string; updates: Partial<Timer> } }
  | { type: 'DELETE_TIMER'; payload: string }
  | { type: 'LOAD_TIMERS'; payload: Timer[] }
  | { type: 'BULK_ACTION'; payload: { category: string; action: 'start' | 'pause' | 'reset' } };