import { CrewEntity } from '../../data/types';

export const CREWS: Record<string, CrewEntity> = {
  'the-lockers': {
    id: 'the-lockers',
    nameKey: 'crews.theLockers.name',
    foundedYear: '1970',
    originLocationKey: 'styles.locations.losAngelesCA',
    memberIds: ['don-campbell', 'toni-basil', 'fred-berry', 'greg-pope', 'adolfo-quinones', 'bill-williams', 'leo-williamson'],
    descriptionKey: 'crews.theLockers.description',
  },
  'breed-of-motion': {
    id: 'breed-of-motion',
    nameKey: 'crews.breedOfMotion.name',
    foundedYear: '1980s',
    originLocationKey: 'styles.locations.newYorkCity',
    memberIds: ['tyrone-proctor', 'willi-ninja', 'archie-burnett'],
    descriptionKey: 'crews.breedOfMotion.description',
  },
  'outrageous-waack-dancers': {
    id: 'outrageous-waack-dancers',
    nameKey: 'crews.outrageousWaackDancers.name',
    foundedYear: '1970s',
    originLocationKey: 'styles.locations.losAngelesCA',
    memberIds: ['tyrone-proctor', 'jeffrey-daniel', 'jody-watley', 'billy-goodson', 'sharon-hill', 'cleveland-moses-jr', 'kirt-washington'],
    descriptionKey: 'crews.outrageousWaackDancers.description',
  },
  'house-of-xtravaganza': {
    id: 'house-of-xtravaganza',
    nameKey: 'crews.houseOfXtravaganza.name',
    foundedYear: '1980s',
    originLocationKey: 'styles.locations.newYorkCity',
    memberIds: ['jose-xtravaganza', 'luis-xtravaganza'],
    descriptionKey: 'crews.houseOfXtravaganza.description',
  },
};

export const CREWS_LIST: CrewEntity[] = Object.values(CREWS);

export const getCrewById = (id: string): CrewEntity | undefined => {
  return CREWS[id];
};

export const getAllCrews = () => CREWS_LIST;

// Helper functions for member relationships  
export const getCrewsByMemberId = (personId: string): CrewEntity[] => {
  return CREWS_LIST.filter(crew => crew.memberIds?.includes(personId));
};
