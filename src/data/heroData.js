import { getActiveSeason } from './seasonsData';

export const HERO_PLACEHOLDERS = [
  'AC not cooling',
  'Tap leaking',
  'Cockroaches in kitchen',
  'Geyser not heating',
  'Chimney cleaning',
  'Fan repair & fitting',
];

export const BASE_SYMPTOM_CHIPS = [
  { label: 'AC not cooling', query: 'AC not cooling' },
  { label: 'Tap leaking', query: 'Tap leaking' },
  { label: 'Cockroaches', query: 'Cockroaches' },
  { label: 'Geyser not heating', query: 'Geyser not heating' },
];

export function getHeroSymptomChips(city = 'Bengaluru', dateOverride = null) {
  const chips = [...BASE_SYMPTOM_CHIPS];
  const activeSeason = getActiveSeason(city, dateOverride);
  if (activeSeason) {
    chips.push({
      label: activeSeason.chipLabel,
      query: activeSeason.chipLabel,
      isSeasonal: true,
    });
  }
  return chips;
}
