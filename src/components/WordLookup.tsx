"use client"

import { useState } from 'react'
import { saveToLocalStorage, getFromLocalStorage, Word } from '@/lib/utils'
import { Search, Volume2, Plus, Loader2 } from 'lucide-react'

export default function WordLookup() {
  const [word, setWord] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchWord = async () => {
    if (!word.trim()) return
    
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      if (!response.ok) {
        throw new Error('找不到该单词，请检查拼写是否正确')
      }
      const data = await response.json()
      setResult(data[0])
    } catch (error: any) {
      console.error('Error fetching word:', error)
      setResult(null)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl)
    audio.play()
  }

  const addToVocabulary = () => {
    if (!result) return

    const vocabulary = getFromLocalStorage('vocabulary') || []
    // 检查单词是否已存在
    if (vocabulary.some((w: Word) => w.word.toLowerCase() === result.word.toLowerCase())) {
      setError('该单词已在生词本中')
      return
    }

    const newWord: Word = {
      id: Date.now().toString(),
      word: result.word,
      meaning: result.meanings[0].definitions[0].definition,
      addedAt: new Date().toISOString()
    }

    vocabulary.push(newWord)
    saveToLocalStorage('vocabulary', vocabulary)
    setError('单词已添加到生词本！')
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
          placeholder="输入要查询的单词"
          className="flex h-12 w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onKeyPress={(e) => e.key === 'Enter' && searchWord()}
        />
        <button
          onClick={searchWord}
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
        <div className={`p-4 rounded-md ${error.includes('已添加') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm divide-y">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{result.word}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {result.phonetic}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {result.phonetics?.find((p: any) => p.audio) && (
                  <button
                    onClick={() => playAudio(result.phonetics.find((p: any) => p.audio).audio)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={addToVocabulary}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                  添加到生词本
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {result.meanings.map((meaning: any, index: number) => (
              <div key={index} className="mb-6 last:mb-0">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  {meaning.partOfSpeech}
                </h4>
                <ul className="space-y-4">
                  {meaning.definitions.map((def: any, idx: number) => (
                    <li key={idx} className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium text-gray-600 dark:text-gray-300">释义: </span>
                        {def.definition}
                      </p>
                      {def.example && (
                        <p className="text-sm text-muted-foreground pl-4 border-l-2">
                          <span className="font-medium">例句: </span>
                          {def.example}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
                {meaning.synonyms?.length > 0 && (
                  <div className="mt-3">
                    <span className="text-sm font-medium text-muted-foreground">同义词: </span>
                    <span className="text-sm">{meaning.synonyms.join(", ")}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
