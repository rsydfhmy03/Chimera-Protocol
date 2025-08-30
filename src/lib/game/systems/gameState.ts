import { writable } from 'svelte/store';

export interface GameState {
  operativeCodename: string | null;
  dFrags: number;
  unlockedNodes: string[];
  completedNodes: string[];
  activeNode: string | null;
}


const initialState: GameState = {
  operativeCodename: null,
  dFrags: 100,
  unlockedNodes: ['node-alpha-01'], // Node pertama selalu terbuka
  completedNodes: [],
  activeNode: null,
};

export const gameState = writable<GameState>(initialState);