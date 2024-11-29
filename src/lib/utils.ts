import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface License {
  name: string
  url: string
}

export interface Phonetic {
  text?: string
  audio?: string
  sourceUrl?: string
  license?: License
}

export interface Definition {
  definition: string
  synonyms: string[]
  antonyms: string[]
  example?: string
  translation?: string
}

export interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: string[]
}

export interface DictionaryResult {
  word: string
  phonetics: Phonetic[]
  meanings: Meaning[]
  license: License
  sourceUrls: string[]
}

export interface Word {
  id: string
  word: string
  phonetic: string
  meaning: string
  addedAt: string
  lastReviewed: string | null
}

export function getFromLocalStorage(key: string) {
  if (typeof window === 'undefined') return null
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export function saveToLocalStorage(key: string, value: any) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

export async function translateText(text: string): Promise<string> {
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&q=${encodeURIComponent(text)}`
    )
    const data = await response.json()
    return data[0][0][0]
  } catch (error) {
    console.error('Translation error:', error)
    return ''
  }
}

// 词性映射
export const partOfSpeechMap: Record<string, string> = {
  noun: "名词",
  verb: "动词",
  adjective: "形容词",
  adverb: "副词",
  pronoun: "代词",
  preposition: "介词",
  conjunction: "连词",
  interjection: "感叹词",
  article: "冠词",
  determiner: "限定词",
  numeral: "数词"
}

// 判断是否为常用释义（基于位置和词性）
export const isCommonDefinition = (entry: DictionaryResult, meaningIndex: number, defIndex: number): boolean => {
  // 第一个词条的第一个词性的第一个释义视为最常用
  if (meaningIndex === 0 && defIndex === 0) {
    return true
  }
  
  // 名词和动词的第一个释义也视为常用
  const meaning = entry.meanings[meaningIndex]
  if (defIndex === 0 && (meaning.partOfSpeech === 'noun' || meaning.partOfSpeech === 'verb')) {
    return true
  }
  
  return false
}
