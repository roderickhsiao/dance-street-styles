import { PersonEntity } from '../../data/types';

export const PEOPLE: Record<string, PersonEntity> = {
  'don-campbell': {
    id: 'don-campbell',
    nameKey: 'people.donCampbell.name',
    roleKey: 'people.donCampbell.role',
    bioKey: 'people.donCampbell.bio',
    imageUrl: '',
  },
  'toni-basil': {
    id: 'toni-basil',
    nameKey: 'people.toniBasil.name',
    roleKey: 'people.toniBasil.role',
    bioKey: 'people.toniBasil.bio',
    imageUrl: '',
  },
  'fred-berry': {
    id: 'fred-berry',
    nameKey: 'people.fredBerry.name',
    roleKey: 'people.fredBerry.role',
    bioKey: 'people.fredBerry.bio',
    imageUrl: '',
  },
  'dj-kool-herc': {
    id: 'dj-kool-herc',
    nameKey: 'people.djKoolHerc.name',
    roleKey: 'people.djKoolHerc.role',
    bioKey: 'people.djKoolHerc.bio',
    imageUrl: '',
  },
  'grandmaster-flash': {
    id: 'grandmaster-flash',
    nameKey: 'people.grandmasterFlash.name',
    roleKey: 'people.grandmasterFlash.role',
    bioKey: 'people.grandmasterFlash.bio',
    imageUrl: '',
  },
  'afrika-bambaataa': {
    id: 'afrika-bambaataa',
    nameKey: 'people.afrikaBambaataa.name',
    roleKey: 'people.afrikaBambaataa.role',
    bioKey: 'people.afrikaBambaataa.bio',
    imageUrl: '',
  },
  'grandmaster-caz': {
    id: 'grandmaster-caz',
    nameKey: 'people.grandmasterCaz.name',
    roleKey: 'people.grandmasterCaz.role',
    bioKey: 'people.grandmasterCaz.bio',
    imageUrl: '',
  },
  'melle-mel': {
    id: 'melle-mel',
    nameKey: 'people.melleMel.name',
    roleKey: 'people.melleMel.role',
    bioKey: 'people.melleMel.bio',
    imageUrl: '',
  },
  'kurtis-blow': {
    id: 'kurtis-blow',
    nameKey: 'people.kurtisBlow.name',
    roleKey: 'people.kurtisBlow.role',
    bioKey: 'people.kurtisBlow.bio',
    imageUrl: '',
  },
  'crazy-legs': {
    id: 'crazy-legs',
    nameKey: 'people.crazyLegs.name',
    roleKey: 'people.crazyLegs.role',
    bioKey: 'people.crazyLegs.bio',
    imageUrl: '',
  },
  'ken-swift': {
    id: 'ken-swift',
    nameKey: 'people.kenSwift.name',
    roleKey: 'people.kenSwift.role',
    bioKey: 'people.kenSwift.bio',
    imageUrl: '',
  },
  'baby-love': {
    id: 'baby-love',
    nameKey: 'people.babyLove.name',
    roleKey: 'people.babyLove.role',
    bioKey: 'people.babyLove.bio',
    imageUrl: '',
  },
  'darryl-cornbread-mc-cray': {
    id: 'darryl-cornbread-mc-cray',
    nameKey: 'people.darrylCornbreadMcCray.name',
    roleKey: 'people.darrylCornbreadMcCray.role',
    bioKey: 'people.darrylCornbreadMcCray.bio',
    imageUrl: '',
  },
  'taki-183': {
    id: 'taki-183',
    nameKey: 'people.taki183.name',
    roleKey: 'people.taki183.role',
    bioKey: 'people.taki183.bio',
    imageUrl: '',
  },
  'phase-2': {
    id: 'phase-2',
    nameKey: 'people.phase2.name',
    roleKey: 'people.phase2.role',
    bioKey: 'people.phase2.bio',
    imageUrl: '',
  },
  'lady-pink': {
    id: 'lady-pink',
    nameKey: 'people.ladyPink.name',
    roleKey: 'people.ladyPink.role',
    bioKey: 'people.ladyPink.bio',
    imageUrl: '',
  },
  'krs-one': {
    id: 'krs-one',
    nameKey: 'people.krsOne.name',
    roleKey: 'people.krsOne.role',
    bioKey: 'people.krsOne.bio',
    imageUrl: '',
  },
};

export const PEOPLE_LIST: PersonEntity[] = Object.values(PEOPLE);

export const getPersonById = (id: string): PersonEntity | undefined => {
  return PEOPLE[id];
};

export const getAllPeople = () => PEOPLE_LIST;
