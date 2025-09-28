import { ResourceEntity, ResourceType } from '../types';

export const RESOURCES: Record<string, ResourceEntity> = {
  // Don Campbell's Official Website
  'campbellock-official-website': {
    id: 'campbellock-official-website',
    titleKey: 'campbellockWebsite.title',
    type: ResourceType.WEBSITE,
    url: 'https://campbellock.dance/',
    descriptionKey: 'campbellockWebsite.description',
    authorKey: 'campbellockWebsite.author',
    language: 'en',
    platformKey: 'campbellockWebsite.platform',
    tags: ['official', 'history', 'creator', 'locking', 'don-campbell'],
    sourceKey: 'campbellockWebsite.source',
    featured: true,
    // OG metadata will be populated dynamically using translation keys
    ogMetadata: {
      titleKey: 'campbellockWebsite.title',
      descriptionKey: 'campbellockWebsite.description',
      image: '/images/resources/don-campbell-hero.png',
      siteNameKey: 'campbellockWebsite.siteName'
    }
  },

    // The Lockers Official Website
  'the-lockers-official-website': {
    id: 'the-lockers-official-website',
    titleKey: 'theLockersWebsite.title',
    type: ResourceType.WEBSITE,
    url: 'https://www.thelockersdance.com/',
    descriptionKey: 'theLockersWebsite.description',
    authorKey: 'theLockersWebsite.author',
    language: 'en',
    platformKey: 'theLockersWebsite.platform',
    tags: ['official', 'history', 'crew', 'locking', 'the-lockers', 'original-members'],
    sourceKey: 'theLockersWebsite.source',
    featured: true,
    ogMetadata: {
      titleKey: 'theLockersWebsite.title',
      descriptionKey: 'theLockersWebsite.description',
      image: '/images/resources/the-lockers-hero.jpg',
      siteNameKey: 'theLockersWebsite.siteName'
    }
  },

  // Check Your Body at the Door - House Dance Documentary
  'check-your-body-at-the-door': {
    id: 'check-your-body-at-the-door',
    titleKey: 'checkYourBodyAtTheDoor.title',
    type: ResourceType.DOCUMENTARY,
    url: 'https://www.youtube.com/watch?v=xWBoXrHRhmA',
    descriptionKey: 'checkYourBodyAtTheDoor.description',
    authorKey: 'checkYourBodyAtTheDoor.author',
    year: '1995',
    duration: '63 min',
    language: 'en',
    platformKey: 'checkYourBodyAtTheDoor.platform',
    tags: ['documentary', 'house', 'nyc', '1990s', 'underground', 'club-culture'],
    sourceKey: 'checkYourBodyAtTheDoor.source',
    featured: true,
    ogMetadata: {
      titleKey: 'checkYourBodyAtTheDoor.title',
      descriptionKey: 'checkYourBodyAtTheDoor.description',
      image: 'https://img.youtube.com/vi/xWBoXrHRhmA/maxresdefault.jpg',
      siteNameKey: 'checkYourBodyAtTheDoor.siteName'
    }
  },

  // Come As You Are - Loft Documentary
  'come-as-you-are-loft': {
    id: 'come-as-you-are-loft',
    titleKey: 'comeAsYouAreLoft.title',
    type: ResourceType.DOCUMENTARY,
    url: 'https://www.youtube.com/watch?v=TKZyeShtnNk',
    descriptionKey: 'comeAsYouAreLoft.description',
    authorKey: 'comeAsYouAreLoft.author',
    year: '2018',
    duration: '30 min',
    language: 'en',
    platformKey: 'comeAsYouAreLoft.platform',
    tags: ['documentary', 'house', 'loft', 'nyc', 'david-mancuso', 'club-culture', 'unity'],
    sourceKey: 'comeAsYouAreLoft.source',
    featured: true,
    ogMetadata: {
      titleKey: 'comeAsYouAreLoft.title',
      descriptionKey: 'comeAsYouAreLoft.description',
      image: 'https://img.youtube.com/vi/TKZyeShtnNk/maxresdefault.jpg',
      siteNameKey: 'comeAsYouAreLoft.siteName'
    }
  },

  // I Was There When House Took Over The World
  'i-was-there-when-house-took-over': {
    id: 'i-was-there-when-house-took-over',
    titleKey: 'iWasThereWhenHouseTookOver.title',
    type: ResourceType.DOCUMENTARY,
    url: 'https://www.youtube.com/watch?v=Hzhd4WsuX6k',
    descriptionKey: 'iWasThereWhenHouseTookOver.description',
    authorKey: 'iWasThereWhenHouseTookOver.author',
    year: '2020',
    duration: '45 min',
    language: 'en',
    platformKey: 'iWasThereWhenHouseTookOver.platform',
    tags: ['documentary', 'house', 'chicago', 'global', 'nile-rodgers', 'jesse-saunders', 'honey-dijon'],
    sourceKey: 'iWasThereWhenHouseTookOver.source',
    featured: true,
    ogMetadata: {
      titleKey: 'iWasThereWhenHouseTookOver.title',
      descriptionKey: 'iWasThereWhenHouseTookOver.description',
      image: 'https://img.youtube.com/vi/Hzhd4WsuX6k/maxresdefault.jpg',
      siteNameKey: 'iWasThereWhenHouseTookOver.siteName'
    }
  },

  // Paris is Burning - Voguing Documentary
  'paris-is-burning': {
    id: 'paris-is-burning',
    titleKey: 'parisIsBurning.title',
    type: ResourceType.DOCUMENTARY,
    url: 'https://www.youtube.com/watch?v=nI7EhpY2yaA',
    descriptionKey: 'parisIsBurning.description',
    authorKey: 'parisIsBurning.author',
    year: '1990',
    duration: '71 min',
    language: 'en',
    platformKey: 'parisIsBurning.platform',
    tags: ['documentary', 'voguing', 'ballroom', 'nyc', 'drag-balls', 'lgbtq', 'harlem'],
    sourceKey: 'parisIsBurning.source',
    featured: true,
    ogMetadata: {
      titleKey: 'parisIsBurning.title',
      descriptionKey: 'parisIsBurning.description',
      image: 'https://img.youtube.com/vi/nI7EhpY2yaA/maxresdefault.jpg',
      siteNameKey: 'parisIsBurning.siteName'
    }
  },

  // Kiki - Voguing Documentary
  'kiki-documentary': {
    id: 'kiki-documentary',
    titleKey: 'kikiDocumentary.title',
    type: ResourceType.DOCUMENTARY,
    url: 'https://www.youtube.com/watch?v=262R7Y3aMyA',
    descriptionKey: 'kikiDocumentary.description',
    authorKey: 'kikiDocumentary.author',
    year: '2016',
    duration: '102 min',
    language: 'en',
    platformKey: 'kikiDocumentary.platform',
    tags: ['documentary', 'voguing', 'ballroom', 'nyc', 'lgbtq', 'kiki-scene', 'contemporary'],
    sourceKey: 'kikiDocumentary.source',
    featured: true,
    ogMetadata: {
      titleKey: 'kikiDocumentary.title',
      descriptionKey: 'kikiDocumentary.description',
      image: 'https://img.youtube.com/vi/262R7Y3aMyA/maxresdefault.jpg',
      siteNameKey: 'kikiDocumentary.siteName'
    }
  },

  // Punking Dance - Official Instagram
  'punking-dance-instagram': {
    id: 'punking-dance-instagram',
    titleKey: 'punkingDanceInstagram.title',
    type: ResourceType.WEBSITE,
    url: 'https://www.instagram.com/punking.dance/',
    descriptionKey: 'punkingDanceInstagram.description',
    authorKey: 'punkingDanceInstagram.author',
    language: 'en',
    platformKey: 'punkingDanceInstagram.platform',
    tags: ['social-media', 'punking', 'waacking', 'contemporary', 'community', 'tutorials'],
    sourceKey: 'punkingDanceInstagram.source',
    featured: true,
    ogMetadata: {
      titleKey: 'punkingDanceInstagram.title',
      descriptionKey: 'punkingDanceInstagram.description',
      image: '/images/resources/punking-dance-instagram.jpg',
      siteNameKey: 'punkingDanceInstagram.siteName'
    }
  },

  // Viktor Manoel Interview - Keeping Punking Alive
  'viktor-manoel-punking-interview': {
    id: 'viktor-manoel-punking-interview',
    titleKey: 'viktorManoelPunkingInterview.title',
    type: ResourceType.ARTICLE,
    url: 'https://danseinfo.no/nyheter/interview-viktor-manoel-is-keeping-punking-alive/',
    descriptionKey: 'viktorManoelPunkingInterview.description',
    authorKey: 'viktorManoelPunkingInterview.author',
    year: '2025',
    language: 'en',
    platformKey: 'viktorManoelPunkingInterview.platform',
    tags: ['interview', 'punking', 'viktor-manoel', 'history', 'lgbtq', 'aids-crisis', 'david-bowie', 'originator'],
    sourceKey: 'viktorManoelPunkingInterview.source',
    featured: true,
    ogMetadata: {
      titleKey: 'viktorManoelPunkingInterview.title',
      descriptionKey: 'viktorManoelPunkingInterview.description',
      siteNameKey: 'viktorManoelPunkingInterview.siteName'
    }
  },

  // Viktor Manoel Dance Mogul Magazine Videos
    'viktor-manoel-dance-mogul-pt1': {
    id: 'viktor-manoel-dance-mogul-pt1',
    titleKey: 'viktorManoelDanceMogulPt1.title',
    type: ResourceType.VIDEO,
    url: 'https://www.youtube.com/watch?v=hdUJlNoFhsk',
    descriptionKey: 'viktorManoelDanceMogulPt1.description',
    authorKey: 'viktorManoelDanceMogulPt1.author',
    year: '2012',
    duration: '9:22',
    language: 'en',
    platformKey: 'viktorManoelDanceMogulPt1.platform',
    tags: ['video', 'interview', 'punking', 'viktor-manoel', 'history', 'dance-mogul-magazine', 'originator'],
    sourceKey: 'viktorManoelDanceMogulPt1.source',
    featured: true,
    ogMetadata: {
      titleKey: 'viktorManoelDanceMogulPt1.title',
      descriptionKey: 'viktorManoelDanceMogulPt1.description',
      image: 'https://img.youtube.com/vi/hdUJlNoFhsk/maxresdefault.jpg',
      siteNameKey: 'viktorManoelDanceMogulPt1.siteName'
    }
  },

    'viktor-manoel-dance-mogul-pt2': {
    id: 'viktor-manoel-dance-mogul-pt2',
    titleKey: 'viktorManoelDanceMogulPt2.title',
    type: ResourceType.VIDEO,
    url: 'https://www.youtube.com/watch?v=ZRs63Gc6Zt0',
    descriptionKey: 'viktorManoelDanceMogulPt2.description',
    authorKey: 'viktorManoelDanceMogulPt2.author',
    year: '2012',
    duration: '7:25',
    language: 'en',
    platformKey: 'viktorManoelDanceMogulPt2.platform',
    tags: ['video', 'interview', 'punking', 'viktor-manoel', 'history', 'dance-mogul-magazine', 'originator'],
    sourceKey: 'viktorManoelDanceMogulPt2.source',
    featured: true,
    ogMetadata: {
      titleKey: 'viktorManoelDanceMogulPt2.title',
      descriptionKey: 'viktorManoelDanceMogulPt2.description',
      image: 'https://img.youtube.com/vi/ZRs63Gc6Zt0/maxresdefault.jpg',
      siteNameKey: 'viktorManoelDanceMogulPt2.siteName'
    }
  },

  'viktor-manoel-dance-mogul-pt3': {
    id: 'viktor-manoel-dance-mogul-pt3',
    titleKey: 'viktorManoelDanceMogulPt3.title',
    type: ResourceType.VIDEO,
    url: 'https://www.youtube.com/watch?v=FUL6PVdrwkM',
    descriptionKey: 'viktorManoelDanceMogulPt3.description',
    authorKey: 'viktorManoelDanceMogulPt3.author',
    year: '2012',
    duration: '7:54',
    language: 'en',
    platformKey: 'viktorManoelDanceMogulPt3.platform',
    tags: ['video', 'interview', 'punking', 'viktor-manoel', 'history', 'dance-mogul-magazine', 'originator', 'bullying'],
    sourceKey: 'viktorManoelDanceMogulPt3.source',
    featured: true,
    ogMetadata: {
      titleKey: 'viktorManoelDanceMogulPt3.title',
      descriptionKey: 'viktorManoelDanceMogulPt3.description',
      image: 'https://img.youtube.com/vi/FUL6PVdrwkM/maxresdefault.jpg',
      siteNameKey: 'viktorManoelDanceMogulPt3.siteName'
    }
  },

  // Life and Death on the New York Dance Floor Book
  'life-and-death-ny-dance-floor': {
    id: 'life-and-death-ny-dance-floor',
    titleKey: 'lifeAndDeathNYDanceFloor.title',
    type: ResourceType.BOOK,
    url: 'https://www.google.com/books/edition/Life_and_Death_on_the_New_York_Dance_Flo/sY4BDQAAQBAJ?hl=en&gbpv=0',
    descriptionKey: 'lifeAndDeathNYDanceFloor.description',
    authorKey: 'lifeAndDeathNYDanceFloor.author',
    year: '2016',
    language: 'en',
    platformKey: 'lifeAndDeathNYDanceFloor.platform',
    tags: ['book', 'history', 'house', 'new-york', 'dance-culture', '1980s', 'post-disco', 'hip-hop', 'post-punk'],
    sourceKey: 'lifeAndDeathNYDanceFloor.source',
    featured: true,
    ogMetadata: {
      titleKey: 'lifeAndDeathNYDanceFloor.title',
      descriptionKey: 'lifeAndDeathNYDanceFloor.description',
      image: '/images/resources/life-and-death-ny-dance-floor.jpg',
      siteNameKey: 'lifeAndDeathNYDanceFloor.siteName'
    }
  },

  // Sally Sommer Academic Article on House Dancing
  'sally-sommer-house-dancing': {
    id: 'sally-sommer-house-dancing',
    titleKey: 'sallySommerHouseDancing.title',
    type: ResourceType.ARTICLE,
    url: 'https://www.cambridge.org/core/Services/aop-cambridge-core/content/view/A243FA2CF22949B6B44F1AB6BDDA49CB/S0149767700006446a.pdf/cmon_to_my_house_undergroundhouse_dancing.pdf',
    descriptionKey: 'sallySommerHouseDancing.description',
    authorKey: 'sallySommerHouseDancing.author',
    year: '2001',
    language: 'en',
    platformKey: 'sallySommerHouseDancing.platform',
    tags: ['academic', 'article', 'house', 'underground', 'dance-research', 'cambridge'],
    sourceKey: 'sallySommerHouseDancing.source',
    featured: true,
    ogMetadata: {
      titleKey: 'sallySommerHouseDancing.title',
      descriptionKey: 'sallySommerHouseDancing.description',
      siteNameKey: 'sallySommerHouseDancing.siteName'
    }
  },

  // Czarina Mirani 5 Magazine Article
  'czarina-mirani-house-history': {
    id: 'czarina-mirani-house-history',
    titleKey: 'czarinaMiraniHouseHistory.title',
    type: ResourceType.ARTICLE,
    url: 'https://5mag.net/features/house-dance-and-dancing/',
    descriptionKey: 'czarinaMiraniHouseHistory.description',
    authorKey: 'czarinaMiraniHouseHistory.author',
    year: '2005',
    language: 'en',
    platformKey: 'czarinaMiraniHouseHistory.platform',
    tags: ['article', 'house', 'history', 'spin', 'slide', 'jack', '5magazine'],
    sourceKey: 'czarinaMiraniHouseHistory.source',
    featured: true,
    ogMetadata: {
      titleKey: 'czarinaMiraniHouseHistory.title',
      descriptionKey: 'czarinaMiraniHouseHistory.description',
      siteNameKey: 'czarinaMiraniHouseHistory.siteName'
    }
  },

  // Barry Walters SPIN Magazine Article
  'barry-walters-burning-down-house': {
    id: 'barry-walters-burning-down-house',
    titleKey: 'barryWaltersBurningDownHouse.title',
    type: ResourceType.ARTICLE,
    url: 'https://www.spin.com/2014/04/burning-down-the-house-chicago-club-80s/',
    descriptionKey: 'barryWaltersBurningDownHouse.description',
    authorKey: 'barryWaltersBurningDownHouse.author',
    year: '1986',
    language: 'en',
    platformKey: 'barryWaltersBurningDownHouse.platform',
    tags: ['article', 'house', 'history', 'spin-magazine', 'early-house', '1980s'],
    sourceKey: 'barryWaltersBurningDownHouse.source',
    featured: true,
    ogMetadata: {
      titleKey: 'barryWaltersBurningDownHouse.title',
      descriptionKey: 'barryWaltersBurningDownHouse.description',
      siteNameKey: 'barryWaltersBurningDownHouse.siteName'
    }
  },

  // Phil Cheeseman DJ Magazine Article
  'phil-cheeseman-history-of-house': {
    id: 'phil-cheeseman-history-of-house',
    titleKey: 'philCheesemanHistoryOfHouse.title',
    type: ResourceType.ARTICLE,
    url: 'http://music.hyperreal.org/library/history_of_house.html',
    descriptionKey: 'philCheesemanHistoryOfHouse.description',
    authorKey: 'philCheesemanHistoryOfHouse.author',
    year: '2003',
    language: 'en',
    platformKey: 'philCheesemanHistoryOfHouse.platform',
    tags: ['article', 'house', 'history', 'dj-magazine', 'comprehensive', 'electronic-music'],
    sourceKey: 'philCheesemanHistoryOfHouse.source',
    featured: true,
    ogMetadata: {
      titleKey: 'philCheesemanHistoryOfHouse.title',
      descriptionKey: 'philCheesemanHistoryOfHouse.description',
      siteNameKey: 'philCheesemanHistoryOfHouse.siteName'
    }
  },

  // Simon Reynolds Generation Ecstasy Book
  'simon-reynolds-generation-ecstasy': {
    id: 'simon-reynolds-generation-ecstasy',
    titleKey: 'simonReynoldsGenerationEcstasy.title',
    type: ResourceType.BOOK,
    descriptionKey: 'simonReynoldsGenerationEcstasy.description',
    authorKey: 'simonReynoldsGenerationEcstasy.author',
    year: '1999',
    language: 'en',
    platformKey: 'simonReynoldsGenerationEcstasy.platform',
    tags: ['book', 'techno', 'rave', 'house', 'electronic', 'culture', 'routledge'],
    sourceKey: 'simonReynoldsGenerationEcstasy.source',
    featured: true,
    ogMetadata: {
      titleKey: 'simonReynoldsGenerationEcstasy.title',
      descriptionKey: 'simonReynoldsGenerationEcstasy.description',
      siteNameKey: 'simonReynoldsGenerationEcstasy.siteName'
    }
  },

  // Do You Remember House Book
  'do-you-remember-house': {
    id: 'do-you-remember-house',
    titleKey: 'doYouRememberHouse.title',
    type: ResourceType.BOOK,
    url: 'https://www.google.com/books/edition/Do_You_Remember_House/FARREAAAQBAJ?hl=en&gbpv=0',
    descriptionKey: 'doYouRememberHouse.description',
    authorKey: 'doYouRememberHouse.author',
    year: '2019',
    language: 'en',
    platformKey: 'doYouRememberHouse.platform',
    tags: ['book', 'house', 'chicago', 'queer', 'academic', 'oxford', 'cultural-studies'],
    sourceKey: 'doYouRememberHouse.source',
    featured: true,
    ogMetadata: {
      titleKey: 'doYouRememberHouse.title',
      descriptionKey: 'doYouRememberHouse.description',
      image: '/images/resources/do-you-remember-house.jpg',
      siteNameKey: 'doYouRememberHouse.siteName'
    }
  },

  // Discographies Book
  'discographies-book': {
    id: 'discographies-book',
    titleKey: 'discographiesBook.title',
    type: ResourceType.BOOK,
    url: 'https://www.google.com/books/edition/Discographies/MsWEAgAAQBAJ?hl=en&gbpv=0',
    descriptionKey: 'discographiesBook.description',
    authorKey: 'discographiesBook.author',
    year: '2002',
    language: 'en',
    platformKey: 'discographiesBook.platform',
    tags: ['book', 'academic', 'dance-culture', 'politics', 'taylor-francis', 'cultural-studies'],
    sourceKey: 'discographiesBook.source',
    featured: true,
    ogMetadata: {
      titleKey: 'discographiesBook.title',
      descriptionKey: 'discographiesBook.description',
      image: '/images/resources/discographies-book.jpg',
      siteNameKey: 'discographiesBook.siteName'
    }
  },

  // Voguing and the House Ballroom Scene Book
  'voguing-house-ballroom-scene': {
    id: 'voguing-house-ballroom-scene',
    titleKey: 'voguingHouseBallroomScene.title',
    type: ResourceType.BOOK,
    url: 'https://www.google.com/books/edition/Voguing_and_the_House_Ballroom_Scene_of/cq2NZwEACAAJ?hl=en',
    descriptionKey: 'voguingHouseBallroomScene.description',
    authorKey: 'voguingHouseBallroomScene.author',
    year: '2011',
    language: 'en',
    platformKey: 'voguingHouseBallroomScene.platform',
    tags: ['book', 'voguing', 'ballroom', 'photography', 'harlem', 'soul-jazz', 'visual-documentation'],
    sourceKey: 'voguingHouseBallroomScene.source',
    featured: true,
    ogMetadata: {
      titleKey: 'voguingHouseBallroomScene.title',
      descriptionKey: 'voguingHouseBallroomScene.description',
      image: '/images/resources/voguing-house-ballroom-scene.jpg',
      siteNameKey: 'voguingHouseBallroomScene.siteName'
    }
  },

  // The Queen Documentary (1968)
  'the-queen-documentary': {
    id: 'the-queen-documentary',
    titleKey: 'theQueenDoc.title',
    type: ResourceType.DOCUMENTARY,
    url: 'https://www.youtube.com/watch?v=RYCQEl8TPeM',
    descriptionKey: 'theQueenDoc.description',
    authorKey: 'theQueenDoc.director',
    year: '1968',
    language: 'en',
    platformKey: 'theQueenDoc.platform',
    tags: ['documentary', 'ballroom', 'drag', 'competition', 'crystal-labeija', 'flawless-sabrina', 'groundbreaking'],
    sourceKey: 'theQueenDoc.source',
    featured: true,
    ogMetadata: {
      titleKey: 'theQueenDoc.title',
      descriptionKey: 'theQueenDoc.description',
      image: 'https://img.youtube.com/vi/RYCQEl8TPeM/maxresdefault.jpg',
      siteNameKey: 'theQueenDoc.siteName'
    }
  },

  // How Do I Look Documentary (2006)
  'how-do-i-look-documentary': {
    id: 'how-do-i-look-documentary',
    titleKey: 'howDoILookDoc.title',
    type: ResourceType.DOCUMENTARY,
    url: 'https://www.youtube.com/watch?v=FP8O19hdqfo',
    descriptionKey: 'howDoILookDoc.description',
    authorKey: 'howDoILookDoc.director',
    year: '2006',
    language: 'en',
    platformKey: 'howDoILookDoc.platform',
    tags: ['documentary', 'ballroom', 'voguing', 'willi-ninja', 'jose-xtravaganza', 'harlem-renaissance', 'decade-long'],
    sourceKey: 'howDoILookDoc.source',
    featured: true,
    ogMetadata: {
      titleKey: 'howDoILookDoc.title',
      descriptionKey: 'howDoILookDoc.description',
      image: 'https://img.youtube.com/vi/FP8O19hdqfo/maxresdefault.jpg',
      siteNameKey: 'howDoILookDoc.siteName'
    }
  },

  // Strike A Pose Documentary (2016)
  'strike-a-pose-documentary': {
    id: 'strike-a-pose-documentary',
    titleKey: 'strikeAPoseDoc.title',
    type: ResourceType.DOCUMENTARY,
    url: 'https://www.youtube.com/watch?v=MuIFqNu9mgQ',
    descriptionKey: 'strikeAPoseDoc.description',
    authorKey: 'strikeAPoseDoc.director',
    year: '2016',
    language: 'en',
    platformKey: 'strikeAPoseDoc.platform',
    tags: ['documentary', 'voguing', 'madonna', 'jose-xtravaganza', 'luis-xtravaganza', 'truth-or-dare', 'blond-ambition'],
    sourceKey: 'strikeAPoseDoc.source',
    featured: true,
    ogMetadata: {
      titleKey: 'strikeAPoseDoc.title',
      descriptionKey: 'strikeAPoseDoc.description',
      image: 'https://img.youtube.com/vi/MuIFqNu9mgQ/maxresdefault.jpg',
      siteNameKey: 'strikeAPoseDoc.siteName'
    }
  },

  // My House Documentary Series (2018)
  'my-house-documentary': {
    id: 'my-house-documentary',
    titleKey: 'myHouseDoc.title',
    type: ResourceType.DOCUMENTARY,
    url: 'https://www.youtube.com/watch?v=IADXhA9Oaso',
    descriptionKey: 'myHouseDoc.description',
    authorKey: 'myHouseDoc.director',
    year: '2018',
    language: 'en',
    platformKey: 'myHouseDoc.platform',
    tags: ['documentary', 'ballroom', 'contemporary', 'viceland', 'tati-007', 'alex-mugler', 'series'],
    sourceKey: 'myHouseDoc.source',
    featured: false,
    ogMetadata: {
      titleKey: 'myHouseDoc.title',
      descriptionKey: 'myHouseDoc.description',
      image: 'https://img.youtube.com/vi/IADXhA9Oaso/maxresdefault.jpg',
      siteNameKey: 'myHouseDoc.siteName'
    }
  }
};

// Helper function to get resource by ID
export function getResourceById(id: string): ResourceEntity | undefined {
  return RESOURCES[id];
}

// Helper function to get resources by type
export function getResourcesByType(type: string): ResourceEntity[] {
  return Object.values(RESOURCES).filter(resource => resource.type === type);
}

// Helper function to get featured resources
export function getFeaturedResources(): ResourceEntity[] {
  return Object.values(RESOURCES).filter(resource => resource.featured);
}

// Helper function to get resources by tag
export function getResourcesByTag(tag: string): ResourceEntity[] {
  return Object.values(RESOURCES).filter(resource => 
    resource.tags?.includes(tag)
  );
}

// Helper function to get all resources
export function getAllResources(): ResourceEntity[] {
  return Object.values(RESOURCES);
}

// Helper function to get resources by language
export function getResourcesByLanguage(language: string): ResourceEntity[] {
  return Object.values(RESOURCES).filter(resource => resource.language === language);
}

// Export as resourceEntities for consistency with other entity files
export const resourceEntities = RESOURCES;