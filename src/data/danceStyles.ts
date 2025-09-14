import { DanceStyle } from './types';

export const danceStyles: DanceStyle[] = [
  {
    id: 'hip-hop',
    name: 'Hip-Hop',
    slug: 'hip-hop',
    shortDescription: 'The foundational street dance that emerged from Hip-Hop culture in the 1970s.',
    fullDescription: 'Hip-Hop dance is a range of street dance styles primarily performed to Hip-Hop music or that have evolved as part of Hip-Hop culture. It includes a wide range of styles primarily breaking which was created in New York City in the 1970s.',
    origins: {
      year: '1970s',
      location: 'New York City, USA',
      culture: 'African American and Latino communities'
    },
    characteristics: [
      'Rhythmic and energetic movements',
      'Improvisation and freestyle',
      'Connection to Hip-Hop music',
      'Ground work and aerial moves',
      'Battle culture'
    ],
    keyMoves: [
      'Toprock',
      'Downrock/Footwork',
      'Power moves',
      'Freezes',
      'Transitions'
    ],
    influentialArtists: [
      {
        name: 'Afrika Bambaataa',
        role: 'Pioneer',
        bio: 'Known as the "Godfather of Hip-Hop," he helped establish the foundational elements of Hip-Hop culture.',
      },
      {
        name: 'Crazy Legs',
        role: 'B-Boy Legend',
        bio: 'Member of Rock Steady Crew, one of the most influential breaking crews in Hip-Hop history.',
      }
    ],
    musicGenres: ['Hip-Hop', 'Breakbeat', 'Funk', 'Old School Rap'],
    videos: [
      {
        id: 'hiphop-basics',
        title: 'Hip-Hop Dance Basics',
        url: 'https://example.com/hiphop-basics',
        type: 'tutorial',
        description: 'Learn the fundamental moves of Hip-Hop dance',
      }
    ],
    timeline: [
      {
        year: '1973',
        title: 'Birth of Hip-Hop',
        description: 'DJ Kool Herc throws a party in the Bronx, marking the beginning of Hip-Hop culture',
        significance: 'high'
      },
      {
        year: '1977',
        title: 'Rock Steady Crew Formation',
        description: 'One of the most famous breaking crews is formed',
        significance: 'high'
      }
    ],
    theme: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#1A1A1A',
      foreground: '#FFFFFF',
      muted: '#4A4A4A'
    },
    relatedStyles: ['breaking', 'popping', 'locking']
  },
  {
    id: 'breaking',
    name: 'Breaking (B-Boying/B-Girling)',
    slug: 'breaking',
    shortDescription: 'Athletic floor-based dance style featuring spins, freezes, and power moves.',
    fullDescription: 'Breaking, also called b-boying or b-girling, is a style of street dance that originated in the Bronx, New York City in the early 1970s. It is arguably the best known of the hip-hop dance styles.',
    origins: {
      year: '1970s',
      location: 'Bronx, New York City',
      culture: 'African American and Puerto Rican youth'
    },
    characteristics: [
      'Four main elements: toprock, downrock, power moves, freezes',
      'Competitive battle format',
      'Athletic and acrobatic',
      'Improvisation-based',
      'Circular dance floor (cypher)'
    ],
    keyMoves: [
      '6-Step',
      'Windmill',
      'Headspin',
      'Baby freeze',
      'Backspin'
    ],
    influentialArtists: [
      {
        name: 'Crazy Legs',
        role: 'Pioneer',
        bio: 'President of Rock Steady Crew and one of the most respected b-boys in the world.',
      },
      {
        name: 'Ken Swift',
        role: 'Legend',
        bio: 'Rock Steady Crew member known for his smooth style and foundational moves.',
      }
    ],
    musicGenres: ['Breakbeat', 'Hip-Hop', 'Funk', 'Electronic'],
    videos: [],
    timeline: [
      {
        year: '1973',
        title: 'Breaking Origins',
        description: 'The first b-boys start dancing to DJ Kool Herc\'s break beats',
        significance: 'high'
      }
    ],
    theme: {
      primary: '#E74C3C',
      secondary: '#C0392B',
      accent: '#F39C12',
      background: '#2C3E50',
      foreground: '#ECF0F1',
      muted: '#7F8C8D'
    },
    relatedStyles: ['hip-hop', 'uprock']
  },
  {
    id: 'popping',
    name: 'Popping',
    slug: 'popping',
    shortDescription: 'Street dance style based on quickly contracting and relaxing muscles.',
    fullDescription: 'Popping is a street dance and one of the original funk styles that came from California during the 1960s-70s. It is based on the technique of quickly contracting and relaxing muscles to cause a jerk in the dancer\'s body, referred to as a "pop" or a "hit".',
    origins: {
      year: '1960s-70s',
      location: 'Fresno, California',
      culture: 'African American communities'
    },
    characteristics: [
      'Sharp, robotic movements',
      'Muscle contractions (pops)',
      'Isolation techniques',
      'Animation-inspired moves',
      'Precise timing with music'
    ],
    keyMoves: [
      'Basic pop',
      'Wave',
      'Glide',
      'Tutting',
      'Animation'
    ],
    influentialArtists: [
      {
        name: 'Boogaloo Sam',
        role: 'Creator',
        bio: 'Founder of the Electric Boogaloos and creator of the popping dance style.',
      },
      {
        name: 'Popin\' Pete',
        role: 'Pioneer',
        bio: 'Original member of Electric Boogaloos, known for his robotic style.',
      }
    ],
    musicGenres: ['Funk', 'Hip-Hop', 'Electronic', 'G-Funk'],
    videos: [],
    timeline: [
      {
        year: '1975',
        title: 'Electric Boogaloos Formation',
        description: 'Boogaloo Sam forms the Electric Boogaloos crew',
        significance: 'high'
      }
    ],
    theme: {
      primary: '#9B59B6',
      secondary: '#8E44AD',
      accent: '#E67E22',
      background: '#34495E',
      foreground: '#FFFFFF',
      muted: '#95A5A6'
    },
    relatedStyles: ['locking', 'animation', 'tutting']
  },
  {
    id: 'locking',
    name: 'Locking',
    slug: 'locking',
    shortDescription: 'Funk-based dance style characterized by distinctive arm and hand movements.',
    fullDescription: 'Locking is a style of funk dance, which is today also associated with hip-hop. The name is based on the concept of locking movements, which means freezing from a fast movement and "locking" in a certain position.',
    origins: {
      year: '1960s',
      location: 'Los Angeles, California',
      culture: 'African American communities'
    },
    characteristics: [
      'Fast movements followed by pauses (locks)',
      'Funky, upbeat energy',
      'Distinctive hand gestures',
      'Comedic and entertaining',
      'Team-oriented performances'
    ],
    keyMoves: [
      'Lock',
      'Point',
      'Wrist roll',
      'Uncle Sam',
      'Scooby Doo'
    ],
    influentialArtists: [
      {
        name: 'Don Campbell',
        role: 'Creator',
        bio: 'Inventor of locking dance and founder of The Lockers crew.',
      },
      {
        name: 'Shabba-Doo',
        role: 'Pioneer',
        bio: 'Member of The Lockers and star of "Breakin\'" movies.',
      }
    ],
    musicGenres: ['Funk', 'Soul', 'Disco', 'Hip-Hop'],
    videos: [],
    timeline: [
      {
        year: '1969',
        title: 'Don Campbell Creates Locking',
        description: 'Don Campbell accidentally creates the first locking move',
        significance: 'high'
      }
    ],
    theme: {
      primary: '#F1C40F',
      secondary: '#F39C12',
      accent: '#E67E22',
      background: '#2C3E50',
      foreground: '#2C3E50',
      muted: '#7F8C8D'
    },
    relatedStyles: ['popping', 'waacking', 'hip-hop']
  },
  {
    id: 'house',
    name: 'House Dance',
    slug: 'house',
    shortDescription: 'Social dance style that emerged with house music in Chicago and New York.',
    fullDescription: 'House dance is a freestyle street dance and social dance that has roots in the underground house music scene of Chicago and New York. It is characterized by fluid leg-oriented movements.',
    origins: {
      year: '1980s',
      location: 'Chicago & New York',
      culture: 'African American and Latino LGBTQ+ communities'
    },
    characteristics: [
      'Fluid, rhythmic movements',
      'Emphasis on footwork',
      'Social and community-oriented',
      'Improvisational',
      'Connection to house music'
    ],
    keyMoves: [
      'Jacking',
      'Footwork',
      'Skating',
      'Lofting',
      'Release'
    ],
    influentialArtists: [
      {
        name: 'Ejoe Wilson',
        role: 'Pioneer',
        bio: 'One of the founding fathers of house dance, known for his smooth style.',
      },
      {
        name: 'Brian "Footwork" Green',
        role: 'Legend',
        bio: 'Influential house dancer known for his intricate footwork patterns.',
      }
    ],
    musicGenres: ['House', 'Deep House', 'Garage', 'Techno'],
    videos: [],
    timeline: [
      {
        year: '1985',
        title: 'House Music Emerges',
        description: 'House music scene develops in Chicago clubs',
        significance: 'high'
      }
    ],
    theme: {
      primary: '#3498DB',
      secondary: '#2980B9',
      accent: '#1ABC9C',
      background: '#ECF0F1',
      foreground: '#2C3E50',
      muted: '#BDC3C7'
    },
    relatedStyles: ['voguing', 'waacking', 'jazz-funk']
  },
  {
    id: 'voguing',
    name: 'Voguing',
    slug: 'voguing',
    shortDescription: 'Ballroom culture dance inspired by fashion poses and Egyptian hieroglyphs.',
    fullDescription: 'Voguing is a highly stylized, modern house dance originating in the late 1980s that evolved out of the Harlem ballroom scene. It gained mainstream exposure when featured in Madonna\'s song "Vogue".',
    origins: {
      year: '1960s-80s',
      location: 'Harlem, New York',
      culture: 'Black and Latino LGBTQ+ ballroom community'
    },
    characteristics: [
      'Catwalk and fashion-inspired poses',
      'Hand and arm movements',
      'Performance and theatricality',
      'Ballroom competition format',
      'Five elements: Hand Performance, Catwalk, Duckwalk, Floor Performance, Spinning and Dipping'
    ],
    keyMoves: [
      'Catwalk',
      'Duckwalk',
      'Hand performance',
      'Death drop',
      'Spin and dip'
    ],
    influentialArtists: [
      {
        name: 'Willi Ninja',
        role: 'Legend',
        bio: 'Known as the "Godfather of Voguing," he brought voguing to mainstream attention.',
      },
      {
        name: 'Jose Gutierez Xtravaganza',
        role: 'Pioneer',
        bio: 'Founding member of House of Xtravaganza and voguing pioneer.',
      }
    ],
    musicGenres: ['House', 'Ballroom', 'Electronic', 'Pop'],
    videos: [],
    timeline: [
      {
        year: '1990',
        title: 'Madonna\'s "Vogue"',
        description: 'Voguing gains mainstream recognition through Madonna\'s hit song and music video',
        significance: 'high'
      }
    ],
    theme: {
      primary: '#E91E63',
      secondary: '#AD1457',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242'
    },
    relatedStyles: ['house', 'waacking', 'runway']
  },
  {
    id: 'waacking',
    name: 'Waacking/Whacking',
    slug: 'waacking',
    shortDescription: 'Expressive dance style emphasizing arm movements and poses, born from LA club culture.',
    fullDescription: 'Waacking (also known as Whacking) is a form of street dance characterized by throwing and snapping the arms and posing, developed in the LA gay club scene in the early 1970s. The dance emphasizes musicality, attitude, and storytelling through dramatic poses and fierce expressions. Waacking emerged from the underground gay clubs of Los Angeles, particularly at venues like The Gino, created primarily by young gay men of color as a form of expression and storytelling set to disco music.',
    origins: {
      year: '1970s',
      location: 'Los Angeles, USA',
      culture: 'Gay club culture and LGBTQ+ community'
    },
    characteristics: [
      'Sharp, dramatic arm movements',
      'Fierce poses and attitudes',
      'Musicality and rhythm interpretation',
      'Storytelling through movement',
      'Connection to disco and funk music'
    ],
    keyMoves: [
      'Arm whacking and throwing',
      'Poses and freezes',
      'Floor work',
      'Spins and turns',
      'Hand and finger articulation'
    ],
    influentialArtists: [
      {
        name: 'Tyrone Proctor',
        role: 'Pioneer',
        bio: 'One of the original creators of Waacking, known for his expressive style and teaching.',
      },
      {
        name: 'Arthur Goff',
        role: 'Innovator', 
        bio: 'Key figure in developing Waacking technique and bringing it to mainstream attention.',
      }
    ],
    musicGenres: ['Disco', 'Funk', 'House', 'Electronic'],
    videos: [
      {
        id: 'waacking-basics',
        title: 'Waacking Fundamentals',
        url: 'https://example.com/waacking-basics',
        type: 'tutorial',
        description: 'Learn the essential arm movements and poses of Waacking',
      }
    ],
    timeline: [
      {
        year: '1970s',
        title: 'Birth in LA Gay Clubs',
        description: 'Waacking emerges in underground gay clubs in Los Angeles',
        significance: 'high'
      }
    ],
    theme: {
      primary: '#FF1744',
      secondary: '#D50000',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242'
    },
    relatedStyles: ['voguing', 'jazz', 'contemporary']
  },
  {
    id: 'krump',
    name: 'Krumping',
    slug: 'krump',
    shortDescription: 'High-energy, expressive dance from LA characterized by free, expressive movements.',
    fullDescription: 'Krumping is a street dance style characterized by free, expressive, exaggerated, and highly energetic movement involving the arms, head, legs, chest, and feet. Created in South Central Los Angeles in the early 2000s by Ceasare "Tight Eyez" Willis and Jo\'Artis "Big Mijo" Ratti as a positive outlet for youth to express themselves and channel energy away from gang violence.',
    origins: {
      year: '2000s',
      location: 'Los Angeles, USA',
      culture: 'African American community'
    },
    characteristics: [
      'Highly energetic movements',
      'Exaggerated expressions',
      'Chest bumping and stomping',
      'Spiritual and emotional release',
      'Battle-oriented culture'
    ],
    keyMoves: [
      'Chest pops',
      'Arm swings',
      'Stomps',
      'Jabs and bucks',
      'Kills (powerful poses)'
    ],
    influentialArtists: [
      {
        name: 'Tight Eyez',
        role: 'Creator',
        bio: 'Co-creator of Krumping, founder of the movement and spiritual leader.',
      },
      {
        name: 'Big Mijo',
        role: 'Co-creator',
        bio: 'Co-founder of Krumping who helped establish the dance and its community.',
      }
    ],
    musicGenres: ['Hip-Hop', 'Rap', 'Electronic', 'Experimental'],
    videos: [
      {
        id: 'krump-history',
        title: 'RIZE: The Story of Krump',
        url: 'https://example.com/rize',
        type: 'history',
        description: 'Documentary exploring Krumping culture and its origins',
      }
    ],
    timeline: [
      {
        year: '2000s',
        title: 'Krumping Created',
        description: 'Tight Eyez and Big Mijo create Krumping in South Central LA',
        significance: 'high'
      }
    ],
    theme: {
      primary: '#FF4081',
      secondary: '#E91E63',
      accent: '#FF5722',
      background: '#000000',
      foreground: '#FFFFFF',
      muted: '#424242'
    },
    relatedStyles: ['hip-hop', 'clowning', 'breaking']
  }
];

// Helper functions for data access
export const getDanceStyleById = (id: string): DanceStyle | undefined => {
  return danceStyles.find(style => style.id === id);
};

export const getDanceStyleBySlug = (slug: string): DanceStyle | undefined => {
  return danceStyles.find(style => style.slug === slug);
};

export const getRelatedStyles = (styleId: string): DanceStyle[] => {
  const style = getDanceStyleById(styleId);
  if (!style) return [];
  
  return style.relatedStyles
    .map(relatedId => getDanceStyleById(relatedId))
    .filter((style): style is DanceStyle => style !== undefined);
};

export const getAllDanceStyles = (): DanceStyle[] => {
  return danceStyles;
};
