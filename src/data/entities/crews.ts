import { CrewEntity } from '../../data/types';

export const CREWS: Record<string, CrewEntity> = {
  'the-lockers': {
    id: 'the-lockers',
    nameKey: 'crews.theLockers.name',
    foundedYear: '1970',
    originLocationKey: 'styles.locations.losAngelesCA',
    memberIds: ['don-campbell', 'toni-basil', 'fred-berry'],
    descriptionKey: 'crews.theLockers.description',
  },
};

export const CREWS_LIST: CrewEntity[] = Object.values(CREWS);

export const getCrewById = (id: string): CrewEntity | undefined => {
  return CREWS[id];
};

export const getAllCrews = () => CREWS_LIST;
