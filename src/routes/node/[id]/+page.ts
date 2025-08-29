import { error } from '@sveltejs/kit';
import { levels } from '$lib/game/data/levelData';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const level = levels.find((l) => l.id === params.id);

  if (!level) {
    throw error(404, 'Node not found');
  }

  return {
    level: level
  };
};