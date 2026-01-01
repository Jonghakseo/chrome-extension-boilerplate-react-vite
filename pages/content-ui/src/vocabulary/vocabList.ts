import type { VocabularyItem } from './types';

/**
 * Vocabulary list for word replacements
 * TODO: Replace this with database/API calls when ready
 */
export const vocabList: VocabularyItem[] = [
  {
    from: 'project',
    to: 'projekti',
    fromLang: 'English',
    toLang: 'Finnish',
    enabled: true,
  },
  {
    from: 'hot',
    to: 'kuuma',
    fromLang: 'English',
    toLang: 'Finnish',
    enabled: true,
  },
  {
    from: 'cold',
    to: 'kylmä',
    fromLang: 'English',
    toLang: 'Finnish',
    enabled: true,
  },
  {
    from: 'the',
    to: 'se',
    fromLang: 'English',
    toLang: 'Finnish',
    enabled: false, // disabled by default
  },
];

/**
 * Get active vocabulary items
 * This function simulates what will become a database query
 */
export const getActiveVocabulary = (): VocabularyItem[] => vocabList.filter(item => item.enabled !== false);

/**
 * Get vocabulary by language pair
 * Future: This will query the database with filters
 */
export const getVocabularyByLanguagePair = (fromLang: string, toLang: string): VocabularyItem[] =>
  getActiveVocabulary().filter(item => item.fromLang === fromLang && item.toLang === toLang);
