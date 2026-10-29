
export const SEASONS_CONFIG = [
  // post-monsoon pest control for bengaluru and mumbai (oct-nov)
  {
    id: 'post_monsoon_pest',
    title: 'Post-monsoon pest control',
    chipLabel: 'Post-monsoon pest control',
    months: [10, 11], // Oct–Nov
    cities: ['bengaluru', 'mumbai'],
    serviceIds: ['cockroach-control', 'mosquito-treatment'],
  },
  // winter geyser service for delhi ncr (nov-jan)
  {
    id: 'winter_geyser',
    title: 'Winter ready: geyser service',
    chipLabel: 'Winter geyser service',
    months: [11, 12, 1], // Nov–Jan
    cities: ['delhi', 'delhincr', 'noida', 'gurgaon'],
    serviceIds: ['geyser-repair', 'geyser-installation'],
  },
  // diwali deep cleaning (sep-nov)
  {
    id: 'diwali_cleaning',
    title: 'Diwali deep cleaning — slots filling fast',
    chipLabel: 'Diwali deep cleaning',
    months: [9, 10, 11], // Sep–Nov
    cities: null, // all cities
    serviceIds: ['full-home-cleaning', 'sofa-cleaning', 'paint-one-room'],
  },
  // monsoon prep (may-jun)
  {
    id: 'monsoon_prep',
    title: 'Monsoon prep: seepage & waterproofing',
    chipLabel: 'Monsoon seepage fix',
    months: [5, 6], // May–Jun
    cities: null,
    serviceIds: ['damp-seepage-fix'],
  },
  // beat the heat / pre-summer ac service (mar-may)
  {
    id: 'summer_ac',
    title: 'Beat the heat: AC service before summer',
    chipLabel: 'Beat the heat: AC service',
    months: [3, 4, 5], // Mar–May
    cities: null,
    serviceIds: ['ac-service-jet-wash', 'ac-gas-refill'],
  },
];

export function getActiveSeason(currentCity = 'Bengaluru', dateOverride = null) {
  let targetDate = new Date();

  if (dateOverride) {
    const parsed = new Date(dateOverride);
    if (!isNaN(parsed.getTime())) {
      targetDate = parsed;
    }
  } else if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const mockDate = urlParams.get('mockDate');
    if (mockDate) {
      const parsed = new Date(mockDate);
      if (!isNaN(parsed.getTime())) {
        targetDate = parsed;
      }
    }
  }

  const month = targetDate.getMonth() + 1; // 1 to 12
  const normalizedCity = (currentCity || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  for (const season of SEASONS_CONFIG) {
    const matchesMonth = season.months.includes(month);
    if (!matchesMonth) continue;

    if (!season.cities) {
      return season;
    }

    const matchesCity = season.cities.some((c) => {
      const normC = c.toLowerCase().replace(/[^a-z0-9]/g, '');
      return normalizedCity.includes(normC) || normC.includes(normalizedCity);
    });

    if (matchesCity) {
      return season;
    }
  }

  return null;
}
