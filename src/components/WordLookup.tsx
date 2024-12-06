"use client"

import { useState, useEffect } from 'react'
import { saveToLocalStorage, getFromLocalStorage, Word, translateText, DictionaryResult } from '@/lib/utils'
import { Search, Volume2, Plus, Loader2, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTab } from '@/contexts/TabContext'

const partOfSpeechMap = {
  noun: '名词',
  verb: '动词',
  adjective: '形容词',
  adverb: '副词',
  pronoun: '代词',
  preposition: '介词',
  conjunction: '连词',
  interjection: '感叹词',
}

const isCommonDefinition = (entry: DictionaryResult, meaningIndex: number, definitionIndex: number) => {
  return entry.meanings[meaningIndex].definitions[definitionIndex].definition.includes('common') ||
         entry.meanings[meaningIndex].definitions[definitionIndex].example?.includes('common')
}

export default function WordLookup() {
  const [word, setWord] = useState('')
  const [result, setResult] = useState<DictionaryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [data, setData] = useState<DictionaryResult[]>([])
  const [wordTranslation, setWordTranslation] = useState('')
  const [isWordTranslating, setIsWordTranslating] = useState(false)
  const { selectedWord, setSelectedWord } = useTab()

  useEffect(() => {
    const savedResult = localStorage.getItem('lastWordLookup')
    if (savedResult) {
      try {
        setResult(JSON.parse(savedResult))
      } catch (e) {
        console.error('Error parsing saved result:', e)
      }
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && result) {
      localStorage.setItem('lastWordLookup', JSON.stringify(result))
    }
  }, [result, mounted])

  useEffect(() => {
    if (selectedWord) {
      setWord(selectedWord)
      searchWord(selectedWord)
      setSelectedWord(null)
    }
  }, [selectedWord])

  useEffect(() => {
    if (result) {
      result.meanings.forEach(meaning => {
        meaning.definitions.forEach(async (def) => {
          if (!translations[def.definition]) {
            const translation = await translateText(def.definition)
            setTranslations(prev => ({
              ...prev,
              [def.definition]: translation
            }))
          }
        })
      })
    }
  }, [result])

  const playAudio = async (audioUrl: string) => {
    setPlayingStates(prev => ({ ...prev, [audioUrl]: true }))
    const audio = new Audio(audioUrl)
    try {
      await audio.play()
      audio.onended = () => setPlayingStates(prev => ({ ...prev, [audioUrl]: false }))
    } catch (error) {
      console.error('Error playing audio:', error)
      setError('音频播放失败')
      setPlayingStates(prev => ({ ...prev, [audioUrl]: false }))
    }
  }

  const fetchWordTranslation = async (word: string) => {
    setIsWordTranslating(true)
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&q=${encodeURIComponent(
          word
        )}`
      )
      const data = await response.json()
      setWordTranslation(data[0][0][0])
    } catch (error) {
      console.error("Error fetching word translation:", error)
      setWordTranslation("")
    } finally {
      setIsWordTranslating(false)
    }
  }

  const searchWord = async (searchTerm?: string) => {
    const termToSearch = searchTerm || word.trim()
    if (!termToSearch) return
    
    setLoading(true)
    setError('')
    setSuccessMessage('')
    setData([])
    setTranslations({})
    setWordTranslation('')
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(termToSearch)}`)
      if (!response.ok) {
        throw new Error('找不到该单词，请检查拼写是否正确')
      }
      const data = await response.json()
      setData(data)
      
      // 获取所有词性的释义进行翻译
      const allDefinitions = data.flatMap((entry: DictionaryResult) => 
        entry.meanings.flatMap(meaning => 
          meaning.definitions.map(def => def.definition)
        )
      )
      
      // 批量翻译所有释义
      const translations = await Promise.all(
        allDefinitions.map(async (def) => {
          const translation = await translateText(def)
          return [def, translation]
        })
      )
      
      setTranslations(Object.fromEntries(translations))
      
      // 获取单词翻译
      await fetchWordTranslation(termToSearch)
    } catch (error: any) {
      console.error('Error fetching word:', error)
      setResult(null)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const addToVocabulary = () => {
    if (!data.length) return

    const phoneticData = data[0].phonetics.find(p => p.audio) || data[0].phonetics[0]
    
    const newWord: Word = {
      id: Date.now().toString(),
      word: data[0].word,
      phonetic: phoneticData?.text || '',
      phoneticAudio: phoneticData?.audio || '',
      meaning: '',  
      commonTranslation: wordTranslation || '',
      addedAt: new Date().toISOString(),
      lastReviewed: null,
    }

    const vocabulary = getFromLocalStorage('vocabulary') || []
    
    if (vocabulary.some((w: Word) => w.word.toLowerCase() === data[0].word.toLowerCase())) {
      setError('该单词已在生词本中')
      return
    }

    vocabulary.push(newWord)
    saveToLocalStorage('vocabulary', vocabulary)
    setSuccessMessage('单词已添加到生词本！')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchWord()
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="输入要查询的单词"
          className="flex h-12 w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          onClick={() => searchWord()}
          disabled={loading}
          className="absolute inset-y-0 right-0 flex items-center px-4 rounded-r-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-red-50 text-red-700">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-md bg-green-50 text-green-700">
          {successMessage}
        </div>
      )}

      {data.length > 0 && (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {data[0].word}
                </h3>
                {/* 显示所有不同的音标 */}
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  {Array.from(new Set(data.flatMap(entry => 
                    entry.phonetics
                      .filter(p => p.text && p.audio)
                      .map(p => JSON.stringify({ text: p.text, audio: p.audio }))
                  )))
                  .map((phoneticStr, index) => {
                    const phonetic = JSON.parse(phoneticStr)
                    const isPlaying = playingStates[phonetic.audio] || false
                    const isUS = phonetic.text.includes('US') || index === 0
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base" title={isUS ? "美式音标" : "英式音标"}>
                            {isUS ? "🇺🇸" : "🇬🇧"}
                          </span>
                          <span className="text-xs font-medium text-muted-foreground">
                            {isUS ? "美" : "英"}
                          </span>
                        </div>
                        <span className="text-base text-muted-foreground">
                          {phonetic.text}
                        </span>
                        <button
                          onClick={() => playAudio(phonetic.audio)}
                          disabled={isPlaying}
                          className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          title={isUS ? "播放美式发音" : "播放英式发音"}
                        >
                          <AnimatePresence mode="wait">
                            {isPlaying ? (
                              <motion.div
                                key="playing"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="text-primary"
                              >
                                <Volume2 className="h-5 w-5" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="idle"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                              >
                                <Volume2 className="h-5 w-5" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
              <button
                onClick={addToVocabulary}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                添加到生词本
              </button>
            </div>

            {/* 添加常用释义部分 */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent blur-sm" />
                <div className="relative p-5 rounded-lg border bg-background/80 backdrop-blur-sm">
                  {isWordTranslating ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-base text-muted-foreground">正在翻译...</span>
                    </div>
                  ) : wordTranslation ? (
                    <p className="text-lg text-foreground leading-relaxed tracking-wide pt-2">
                      {wordTranslation}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-b from-background to-background/5">
            {/* 遍历所有返回的结果 */}
            {data.map((entry: DictionaryResult, entryIndex: number) => (
              <div key={entryIndex} className="mb-12 last:mb-0">
                {entry.meanings.map((meaning, meaningIndex) => (
                  <div key={meaningIndex} className="mb-8 last:mb-0">
                    {/* 词性标题部分 */}
                    <div className="relative mb-6">
                      <div className="absolute left-0 top-1/2 h-px w-full bg-border/60" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium text-base">
                            <span>{partOfSpeechMap[meaning.partOfSpeech] || meaning.partOfSpeech}</span>
                          </div>
                        </div>

                        {/* 同义词和反义词部分 */}
                        {(meaning.synonyms.length > 0 || meaning.antonyms.length > 0) && (
                          <div className="mt-4 space-y-3">
                            {meaning.synonyms.length > 0 && (
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                <span className="text-sm font-medium text-muted-foreground min-w-[3rem]">同义词</span>
                                <div className="h-4 w-px bg-border mx-1" />
                                <div className="flex flex-wrap gap-2">
                                  {meaning.synonyms.map((syn, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        setWord(syn)
                                        searchWord(syn)
                                      }}
                                      title="点击查看详情"
                                      className="text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-600 
                                      hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 
                                      dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                                    >
                                      {syn}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {meaning.antonyms.length > 0 && (
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                <span className="text-sm font-medium text-muted-foreground min-w-[3rem]">反义词</span>
                                <div className="h-4 w-px bg-border mx-1" />
                                <div className="flex flex-wrap gap-2">
                                  {meaning.antonyms.map((ant, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => {
                                        setWord(ant)
                                        searchWord(ant)
                                      }}
                                      title="点击查看详情"
                                      className="text-sm px-3 py-1 rounded-full bg-red-50 text-red-600 
                                      hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 
                                      dark:hover:bg-red-900/30 transition-colors cursor-pointer"
                                    >
                                      {ant}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 释义列表部分 */}
                    <ul className="space-y-8">
                      {meaning.definitions.map((def, idx) => (
                        <li key={idx}>
                          <div className="relative">
                            <div className="absolute -left-4 -top-4 w-9 h-9 rounded-full bg-primary/10 text-primary text-base font-medium flex items-center justify-center border-2 border-background shadow-sm">
                              {idx + 1}
                            </div>
                            
                            <div className="rounded-lg bg-card border shadow-sm hover:shadow-md transition-shadow">
                              <div className="p-5 border-b bg-muted/30">
                                <div className="flex items-start gap-3">
                                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-primary text-sm font-semibold">英</span>
                                  </div>
                                  <div className="space-y-1 flex-1">
                                    <p className="text-base leading-relaxed">
                                      {def.definition}
                                    </p>
                                    {isCommonDefinition(entry, meaningIndex, idx) && (
                                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30">
                                        <span className="text-amber-600 dark:text-amber-400 text-xs font-medium">常用释义</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="p-5 bg-background/50">
                                <div className="flex items-start gap-3">
                                  <div className="mt-1 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-red-600 text-sm font-semibold">中</span>
                                  </div>
                                  <p className="text-base text-muted-foreground">
                                    {translations[def.definition] || (
                                      <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        正在翻译...
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                              
                              {def.example && (
                                <div className="p-5 border-t bg-muted/10">
                                  <div className="flex items-start gap-3">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                      <span className="text-green-600 text-sm font-semibold">例</span>
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-base text-muted-foreground italic">
                                        "{def.example}"
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
