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
  'dance-floor': {
    id: 'dance-floor',
    nameKey: 'crews.danceFloor.name',
    foundedYear: '1990s',
    originLocationKey: 'styles.locations.newYorkCity',
    memberIds: ['marjory-smarth', 'ejoe-wilson'],
    descriptionKey: 'crews.danceFloor.description',
  },
  'elite-force': {
    id: 'elite-force',
    nameKey: 'crews.eliteForce.name',
    foundedYear: '1990s',
    originLocationKey: 'styles.locations.newYorkCity',
    memberIds: ['brian-green', 'caleaf-sellers'],
    descriptionKey: 'crews.eliteForce.description',
  },
  'scheme-team': {
    id: 'scheme-team',
    nameKey: 'crews.schemeTeam.name',
    foundedYear: '1980s',
    originLocationKey: 'styles.locations.losAngelesCA',
    memberIds: [],
    descriptionKey: 'crews.schemeTeam.description',
  },
  'club-house': {
    id: 'club-house',
    nameKey: 'crews.clubHouse.name',
    foundedYear: '1980s',
    originLocationKey: 'styles.locations.losAngelesCA',
    memberIds: [],
    descriptionKey: 'crews.clubHouse.description',
  },
  'mop-top': {
    id: 'mop-top',
    nameKey: 'crews.mopTop.name',
    foundedYear: '1990s',
    originLocationKey: 'styles.locations.newYorkCity',
    memberIds: ['caleaf-sellers', 'brooklyn-terry-wright'],
    descriptionKey: 'crews.mopTop.description',
  },
  'dance-fusion': {
    id: 'dance-fusion',
    nameKey: 'crews.danceFusion.name',
    foundedYear: '1990s',
    originLocationKey: 'styles.locations.newYorkCity',
    memberIds: [],
    descriptionKey: 'crews.danceFusion.description',
  },
  'house-nation': {
    id: 'house-nation',
    nameKey: 'crews.houseNation.name',
    foundedYear: '1990s',
    originLocationKey: 'styles.locations.newYorkCity',
    memberIds: [],
    descriptionKey: 'crews.houseNation.description',
  },
  'ghost-shadow': {
    id: 'ghost-shadow',
    nameKey: 'crews.ghostShadow.name',
    foundedYear: '1990s',
    originLocationKey: 'styles.locations.newYorkCity',
    memberIds: [],
    descriptionKey: 'crews.ghostShadow.description',
  },
  'exclusive-elements': {
    id: 'exclusive-elements',
    nameKey: 'crews.exclusiveElements.name',
    foundedYear: '2000s',
    originLocationKey: 'styles.locations.newYorkCity',
    memberIds: [],
    descriptionKey: 'crews.exclusiveElements.description',
  },
  'supernaturalz': {
    id: 'supernaturalz',
    nameKey: 'crews.supernaturalz.name',
    foundedYear: '2000s',
    originLocationKey: 'styles.locations.newYorkCity',
    memberIds: [],
    descriptionKey: 'crews.supernaturalz.description',
  },
  'wanted-posse': {
    id: 'wanted-posse',
    nameKey: 'crews.wantedPosse.name',
    foundedYear: '1993',
    originLocationKey: 'styles.locations.france',
    memberIds: ['mamson', 'babson', 'yugson', 'babyson', 'badson'],
    descriptionKey: 'crews.wantedPosse.description',
  },
  'serial-stepperz': {
    id: 'serial-stepperz',
    nameKey: 'crews.serialStepperz.name',
    foundedYear: '1990s',
    originLocationKey: 'styles.locations.france',
    memberIds: ['mamson', 'babson', 'yugson'],
    descriptionKey: 'crews.serialStepperz.description',
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
