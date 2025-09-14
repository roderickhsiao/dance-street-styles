import { MoveEntity } from '../../data/types';

export const MOVES: Record<string, MoveEntity> = {
  'the-lock': {
    id: 'the-lock',
    nameKey: 'moves.locking.theLock.name',
    descriptionKey: 'moves.locking.theLock.description',
    videoIds: ['locking-featured'],
    difficulty: 'intermediate',
  },
  'points': {
    id: 'points',
    nameKey: 'moves.locking.points.name',
    descriptionKey: 'moves.locking.points.description',
    difficulty: 'beginner',
  },
};

export const MOVES_LIST: MoveEntity[] = Object.values(MOVES);

export const getMoveById = (id: string): MoveEntity | undefined => {
  return MOVES[id];
};

export const getAllMoves = () => MOVES_LIST;
