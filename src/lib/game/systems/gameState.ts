import { writable } from 'svelte/store';

export interface GameState {
  operativeCodename: string | null;
  dFrags: number;
  unlockedNodes: string[];
  completedNodes: string[];
  unlockedCodexIds: string[];
  activeNode: string | null;
}


const initialState: GameState = {
  operativeCodename: null,
  dFrags: 100,
  unlockedNodes: ['node-alpha-01'],
  completedNodes: [],
  unlockedCodexIds: [], 
  activeNode: null,
};

export const gameState = writable<GameState>(initialState);