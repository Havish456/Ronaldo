// data/timeline.ts — typed data layer for CR7 career timeline
// Ground truth data from documentary script — do not invent additional stats.

export type EraColor =
  | 'sporting-green'
  | 'united-red'
  | 'real-white'
  | 'juve-black'
  | 'alnassr-yellow'

export type StatChip = {
  label: string
  value: string | number
  note?: string
}

export type Milestone = {
  id: string
  title: string
  date: string
  description: string
  stats?: StatChip[]
}

export type Era = {
  id: string
  era: string
  title: string
  subtitle: string
  yearRange: string
  color: EraColor
  club: string
  image: string
  accentRgb: string
  description: string
  keyAchievements: { title: string; count?: string; highlight?: boolean }[]
  milestones: Milestone[]
  stats?: StatChip[]
}

export const timeline: Era[] = [
  // ── Era 1 ────────────────────────────────────────────────────────────
  {
    id: 'era-1',
    era: 'Era 1',
    title: 'Madeira & Sporting CP',
    subtitle: 'The making of a phenomenon',
    yearRange: '1985–2003',
    color: 'sporting-green',
    club: 'Sporting CP',
    image: '/images/ronaldo-sporting.svg',
    accentRgb: '16, 185, 129',
    description:
      'Born in Funchal on a volcanic island, the boy who would change football began juggling with socks stuffed in old boots.',
    keyAchievements: [
      { title: 'Sporting CP Senior Debut', count: 'Age 17' },
      { title: 'Breakthrough Friendly vs Man Utd', count: '2003' },
      { title: 'Record Teen Transfer Fee', count: '£12.24m' },
    ],
    milestones: [
      {
        id: 'birth',
        title: 'Born in Funchal',
        date: '1985-02-05',
        description:
          'Cristiano Ronaldo dos Santos Aveiro was born on 5 February 1985 in Funchal, Madeira, Portugal.',
      },
      {
        id: 'youth',
        title: 'Youth academies',
        date: '1997-2002',
        description:
          'Started at local club Andorinha, moved to Nacional, then joined Sporting CP academy around age 11–12.',
      },
      {
        id: 'sporting-debut',
        title: 'Senior debut for Sporting',
        date: '2002',
        description:
          'Broke into the senior squad and wore the Sporting CP jersey in competitive matches.',
      },
      {
        id: 'man-utd-interest',
        title: 'Friendly vs Manchester United',
        date: '2003',
        description:
          'A standout performance in a friendly against Manchester United triggered serious transfer interest from English clubs.',
        stats: [
          { label: 'Age', value: '18' },
          { label: 'Transfer fee', value: '£12.24m' },
        ],
      },
    ],
    stats: [
      { label: 'Birthplace', value: 'Funchal, Madeira' },
      { label: 'Youth clubs', value: 'Andorinha, Nacional, Sporting CP' },
      { label: 'Age at senior debut', value: '~17' },
    ],
  },

  // ── Era 2 ────────────────────────────────────────────────────────────
  {
    id: 'era-2',
    era: 'Era 2',
    title: 'Manchester United I',
    subtitle: 'The No.7 legacy begins',
    yearRange: '2003–2009',
    color: 'united-red',
    club: 'Manchester United',
    image: '/images/ronaldo-united.png',
    accentRgb: '239, 1, 29',
    description:
      'Arrived at Old Trafford at 18, taking over the iconic No.7 jersey from legends who came before him.',
    keyAchievements: [
      { title: "Ballon d'Or", count: '1× (2008)', highlight: true },
      { title: 'UEFA Champions League', count: '1× (2008)', highlight: true },
      { title: 'Premier League Titles', count: '3×' },
      { title: 'Goals in 07/08 Season', count: '42 Goals' },
    ],
    milestones: [
      {
        id: 'no7',
        title: 'Takes the No.7',
        date: '2003',
        description:
          'Joined Manchester United at age 18, succeeding the legendary No.7 shirt previously worn by Best, Cantona, and Beckham.',
      },
      {
        id: 'first-goal',
        title: 'First United goal',
        date: '2003-11',
        description:
          'Scored his first goal for United against Portsmouth in November 2003.',
      },
      {
        id: '2006-07-season',
        title: 'Breakthrough season',
        date: '2006-07',
        description:
          'Won the Premier League title and was named both PFA Player of the Year and PFA Young Player of the Year.',
        stats: [
          { label: 'League goals', value: '17' },
          { label: 'Assists', value: '9' },
          { label: 'PFA Awards', value: '2' },
        ],
      },
      {
        id: '2007-08-season',
        title: "Double + Ballon d'Or",
        date: '2007-08',
        description:
          'Scored 42 goals in all competitions, won the Premier League and Champions League double, scored in the CL final against Chelsea (won on penalties), and claimed his first Ballon d\'Or.',
        stats: [
          { label: 'Goals', value: '42' },
          { label: "Ballon d'Or", value: '1st' },
          { label: 'CL goals', value: '8' },
        ],
      },
    ],
    stats: [
      { label: 'Club', value: 'Manchester United' },
      { label: 'Apps', value: '196' },
      { label: 'Goals', value: '118' },
      { label: 'Premier League', value: '3 titles' },
      { label: 'FA Cup', value: '1' },
      { label: 'League Cup', value: '2' },
      { label: 'Champions League', value: '1' },
      { label: 'Club World Cup', value: '1' },
      { label: "Ballon d'Or", value: '1' },
    ],
  },

  // ── Era 3 ────────────────────────────────────────────────────────────
  {
    id: 'era-3',
    era: 'Era 3',
    title: 'Real Madrid',
    subtitle: 'The Galáctico era',
    yearRange: '2009–2018',
    color: 'real-white',
    club: 'Real Madrid',
    image: '/images/ronaldo-realmadrid.png',
    accentRgb: '255, 255, 255',
    description:
      'In a world-record move, the white jersey became his canvas for historic greatness.',
    keyAchievements: [
      { title: 'UEFA Champions League', count: '4× (Three-Peat)', highlight: true },
      { title: "Ballon d'Or Trophies", count: '4× (5 Total)', highlight: true },
      { title: 'All-Time Top Scorer', count: '451 Goals in 438 Apps', highlight: true },
      { title: 'Single Season UCL Record', count: '17 Goals (2013-14)' },
    ],
    milestones: [
      {
        id: 'world-record',
        title: 'World-record transfer',
        date: '2009-07-06',
        description:
          'Signed for Real Madrid in a world-record deal, presented at the Bernabéu on 6 July 2009.',
        stats: [
          { label: 'Fee', value: '€94m' },
          { label: 'Age', value: '24' },
        ],
      },
      {
        id: 'real-career',
        title: 'Nine seasons of dominance',
        date: '2009-2018',
        description:
          'Played 438 matches, scoring 451 goals — becoming Real Madrid\'s all-time top scorer.',
        stats: [
          { label: 'Matches', value: '438' },
          { label: 'Goals', value: '451' },
          { label: 'Ballon d\'Ors', value: '4 of 5' },
        ],
      },
      {
        id: 'la-decima',
        title: 'La Décima (10th European Cup)',
        date: '2013-14',
        description:
          'Scored 17 Champions League goals (single-season record) and secured Real Madrid\'s 10th European Cup.',
        stats: [
          { label: 'CL goals', value: '17' },
          { label: 'Note', value: 'Single-season record' },
        ],
      },
      {
        id: '2016-17-cl-final',
        title: 'CL final vs Juventus',
        date: '2016-17',
        description:
          'Scored twice in the Champions League final against Juventus.',
        stats: [
          { label: 'Goals', value: '2' },
          { label: 'Result', value: '3-1 win' },
        ],
      },
      {
        id: 'three-peat',
        title: 'Three consecutive CL titles',
        date: '2016-2018',
        description:
          'First team in history to win three consecutive Champions League titles (2016, 2017, 2018).',
        stats: [
          { label: 'Years', value: '2016, 2017, 2018' },
          { label: 'Note', value: 'Historic first' },
        ],
      },
    ],
    stats: [
      { label: 'Apps', value: '438' },
      { label: 'Goals', value: '451' },
      { label: 'Champions League', value: '4' },
      { label: 'La Liga', value: '2' },
      { label: 'Copa del Rey', value: '2' },
      { label: 'Club World Cup', value: '3' },
      { label: 'UEFA Super Cup', value: '3' },
      { label: 'Spanish Super Cup', value: '2' },
      { label: 'Ballon d\'Ors', value: '4' },
    ],
  },

  // ── Era 4 ────────────────────────────────────────────────────────────
  {
    id: 'era-4',
    era: 'Era 4',
    title: 'Portugal & Euro 2016',
    subtitle: 'The international stage',
    yearRange: '2003–2026',
    color: 'united-red',
    club: 'Portugal',
    image: '/images/ronaldo-portugal.png',
    accentRgb: '220, 38, 38',
    description:
      'The red of Portugal became his second home — a journey spanning six World Cups and the triumph of a lifetime.',
    keyAchievements: [
      { title: 'UEFA Euro 2016 Champions', count: '1× (Historic First)', highlight: true },
      { title: 'UEFA Nations League', count: '2× (2019, 2025)', highlight: true },
      { title: 'All-Time International Goals', count: '146 Goals (World Record)', highlight: true },
      { title: 'Six World Cups Scored In', count: '2006–2026' },
    ],
    milestones: [
      {
        id: 'senior-debut',
        title: 'Senior debut',
        date: '2003-08',
        description: 'Made his senior debut for Portugal in August 2003.',
      },
      {
        id: 'euro-2004',
        title: 'Euro 2004 final',
        date: '2004',
        description:
          'Reached the European Championship final, ultimately losing to Greece.',
      },
      {
        id: 'euro-2016',
        title: 'Euro 2016 triumph',
        date: '2016-07-10',
        description:
          'Despite being injured early in the final against France, Portugal won 1-0 in extra time through Eder — delivering their first major international trophy.',
        stats: [
          { label: 'Result', value: '1-0 ET' },
          { label: 'Scorer', value: 'Eder' },
        ],
      },
      {
        id: 'treble-2016',
        title: 'Historic treble year',
        date: '2016',
        description:
          "2016 was the year of the treble: Ballon d'Or #4, Real Madrid won the Champions League, and Portugal won Euro 2016.",
        stats: [
          { label: "Ballon d'Or", value: '#4' },
          { label: 'CL', value: 'Real Madrid' },
          { label: 'Euro', value: 'Portugal' },
        ],
      },
      {
        id: 'nations-league-2019',
        title: 'Nations League 2019',
        date: '2019',
        description:
          'Won the inaugural UEFA Nations League, adding another trophy to the cabinet.',
      },
      {
        id: 'nations-league-2025',
        title: 'Nations League 2025',
        date: '2025',
        description:
          'Portugal became the first nation to win the UEFA Nations League twice, defeating Spain on penalties.',
        stats: [
          { label: 'Note', value: 'First nation to win twice' },
        ],
      },
      {
        id: 'six-world-cups',
        title: 'Six World Cups',
        date: '2006-2026',
        description:
          'Scored in six different FIFA World Cups (2006, 2010, 2014, 2018, 2022, 2026) — the only player in history to achieve this feat.',
        stats: [
          { label: 'World Cups', value: '6' },
          { label: 'World Cup goals', value: '11 in 27 apps' },
        ],
      },
      {
        id: 'world-cup-2026',
        title: 'Final World Cup',
        date: '2026',
        description:
          'Eliminated by Spain in the Round of 16 in 2026 — confirmed as his final FIFA World Cup appearance.',
      },
    ],
    stats: [
      { label: 'Portugal caps', value: '233' },
      { label: 'Portugal goals', value: '146' },
      { label: 'EURO goals', value: '14' },
      { label: 'World Cups', value: '6 (2006–2026)' },
      { label: 'World Cup goals', value: '11' },
      { label: 'World Cup apps', value: '27' },
    ],
  },

  // ── Era 5 ────────────────────────────────────────────────────────────
  {
    id: 'era-5',
    era: 'Era 5',
    title: 'Juventus',
    subtitle: 'The Italian chapter',
    yearRange: '2018–2021',
    color: 'juve-black',
    club: 'Juventus',
    image: '/images/ronaldo-juventus.png',
    accentRgb: '250, 204, 21',
    description:
      'At 33, the veteran arrived in Turin seeking new horizons in Serie A, reaching century goals faster than anyone in club history.',
    keyAchievements: [
      { title: 'Serie A Titles', count: '2× (2019, 2020)', highlight: true },
      { title: 'Centurion in Record Time', count: '101 Goals in 134 Apps', highlight: true },
      { title: 'Coppa Italia & Supercoppa', count: '3 Trophies' },
      { title: 'Serie A Footballer of the Year', count: '2×' },
    ],
    milestones: [
      {
        id: 'juve-join',
        title: 'Joins Juventus',
        date: '2018',
        description:
          'Signed for Juventus at age 33, bringing experience to the Bianconeri.',
      },
      {
        id: 'juve-stats',
        title: 'Two seasons in black and white',
        date: '2018-2021',
        description:
          'Played 134 appearances, scoring 101 goals for the Italian giants.',
        stats: [
          { label: 'Apps', value: '134' },
          { label: 'Goals', value: '101' },
        ],
      },
      {
        id: 'juve-titles',
        title: 'Serie A titles',
        date: '2019-2021',
        description:
          'Won two Serie A titles, a Coppa Italia, and two Italian Super Cups.',
        stats: [
          { label: 'Serie A', value: '2' },
          { label: 'Coppa Italia', value: '1' },
          { label: 'Italian Super Cup', value: '2' },
        ],
      },
    ],
    stats: [
      { label: 'Apps', value: '134' },
      { label: 'Goals', value: '101' },
      { label: 'Serie A', value: '2 titles' },
      { label: 'Coppa Italia', value: '1' },
      { label: 'Italian Super Cup', value: '2' },
    ],
  },

  // ── Era 6 ────────────────────────────────────────────────────────────
  {
    id: 'era-6',
    era: 'Era 6',
    title: 'Manchester United II',
    subtitle: 'Homecoming',
    yearRange: '2021–2022',
    color: 'united-red',
    club: 'Manchester United',
    image: '/images/ronaldo-united.png',
    accentRgb: '239, 1, 29',
    description:
      'Returned to Old Trafford in a magical homecoming, rekindling the relationship that started it all.',
    keyAchievements: [
      { title: 'Dream Old Trafford Return', count: 'Brace vs Newcastle', highlight: true },
      { title: 'Premier League Player of the Month', count: '2×' },
      { title: 'Sir Matt Busby POTY Award', count: '2021-22' },
    ],
    milestones: [
      {
        id: 'united-return',
        title: 'Return to United',
        date: '2021',
        description:
          'Returned to Manchester United in 2021 and scored twice on his second debut against Newcastle.',
        stats: [
          { label: 'Debut match', value: 'vs Newcastle' },
          { label: 'Goals', value: '2' },
        ],
      },
    ],
    stats: [
      { label: 'Apps', value: '7' },
      { label: 'Goals', value: '3' },
      { label: 'Note', value: 'Brief but emotional return' },
    ],
  },

  // ── Era 7 ────────────────────────────────────────────────────────────
  {
    id: 'era-7',
    era: 'Era 7',
    title: 'Al-Nassr',
    subtitle: 'The Saudi adventure',
    yearRange: '2022–present',
    color: 'alnassr-yellow',
    club: 'Al-Nassr',
    image: '/images/ronaldo-alnassr.png',
    accentRgb: '245, 158, 11',
    description:
      'Moved to the Middle East, continuing to defy age and rewrite records as he marches towards 1,000 career goals.',
    keyAchievements: [
      { title: 'Career Goals (August 2026)', count: '977 Goals (23 to 1,000)', highlight: true },
      { title: 'Saudi Pro League Champions', count: '2025–26', highlight: true },
      { title: 'Saudi Golden Boot Winner', count: 'Multiple Seasons' },
      { title: 'Contract Extension to Age 42', count: 'Until 2027' },
    ],
    milestones: [
      {
        id: 'alnassr-join',
        title: 'Joins Al-Nassr',
        date: '2022-12',
        description:
          'Joined Al-Nassr at the end of 2022, becoming one of the highest-paid athletes in history.',
      },
      {
        id: 'contract-extension',
        title: 'Contract extension',
        date: '2025',
        description:
          'In 2025, his contract was extended to 2027 with multiple Golden Boots already secured.',
        stats: [
          { label: 'New expiry', value: '2027' },
          { label: 'Golden Boots', value: 'Multiple' },
        ],
      },
      {
        id: 'saudi-title',
        title: 'Saudi Pro League title',
        date: '2025-26',
        description:
          'Won the Saudi Pro League title in the 2025–26 season.',
      },
      {
        id: '977-goals',
        title: '977 career goals',
        date: '2026-08',
        description:
          'As of August 2026, has scored 977 career goals at age 41 — 23 away from the historic 1,000-goal milestone.',
        stats: [
          { label: 'Age', value: '41' },
          { label: 'Goals', value: '977' },
          { label: 'To 1,000', value: '23 away' },
        ],
      },
    ],
    stats: [
      { label: 'Current club', value: 'Al-Nassr' },
      { label: 'Contract until', value: '2027' },
      { label: 'Career goals', value: '977' },
      { label: 'Age', value: '41' },
    ],
  },
]

// ── Career totals for hero/hero section ─────────────────────────────────
export const careerTotals = {
  ballonDOr: 5,
  ballonDOrYears: [2008, 2013, 2014, 2016, 2017],
  championsLeagueTitles: 5,
  championsLeagueGoals: 140,
  championsLeagueApps: 183,
  singleSeasonCLGoals: 17,
  singleSeasonCLYear: '2013-14',
  knockoutCLGoals: 67,
  portugalCaps: 233,
  portugalGoals: 146,
  euroFinalTournamentGoals: 14,
  realMadridGoals: 451,
  realMadridApps: 438,
  careerGoalsAug2026: 977,
  currentClub: 'Al-Nassr',
  contractUntil: 2027,
} as const

export type CareerTotals = typeof careerTotals

// ── Era color map (for use in components) ───────────────────────────────
export const eraColorMap: Record<EraColor, string> = {
  'sporting-green': '#10b981',
  'united-red': '#ef011d',
  'real-white': '#f5f5f5',
  'juve-black': '#fbbf24',
  'alnassr-yellow': '#f7c600',
}
