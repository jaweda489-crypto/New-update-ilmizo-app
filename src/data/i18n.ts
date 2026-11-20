import { LanguageCode } from '../types/ilmizo';
import {
  LanguageOption,
  SUPPORTED_LANGUAGES,
  TranslationDictionary,
  TranslationKey,
  translationService,
} from '../services/translationService';

export function t(
  lang: LanguageCode,
  key: TranslationKey,
  params?: Record<string, string | number>
): string {
  return translationService.translate(key, lang, params);
}

export function getLanguageOption(lang: LanguageCode): LanguageOption {
  return translationService.getLanguageMetadata(lang);
}

export function loadLanguageLabels(lang: LanguageCode): TranslationDictionary {
  return translationService.loadDictionary(lang);
}

export { SUPPORTED_LANGUAGES, translationService };
export type { LanguageOption, TranslationKey, TranslationDictionary };
