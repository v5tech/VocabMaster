"use client"

import { useState, useEffect } from 'react'
import { getFromLocalStorage, saveToLocalStorage, Word } from '@/lib/utils'
import { Shuffle, List, ChevronLeft, ChevronRight, Eye, EyeOff, Volume2 } from 'lucide-react'

export default function WordReview() {
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)
  const [reviewMode, setReviewMode] = useState<'all' | 'random'>('all')
  const [progress, setProgress] = useState(0)
  const [mastered, setMastered] = useState<Set<string>>(new Set())

  useEffect(() => {
    let savedWords = getFromLocalStorage('vocabulary') || []
    if (reviewMode === 'random') {
      savedWords = [...savedWords].sort(() => Math.random() - 0.5)
    }
    setWords(savedWords)
    setCurrentIndex(0)
    setShowMeaning(false)
    setProgress(0)
    setMastered(new Set())
  }, [reviewMode])

  const currentWord = words[currentIndex]

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setShowMeaning(false)
      
      // 更新复习时间
      const updatedWords = [...words]
      updatedWords[currentIndex] = {
        ...updatedWords[currentIndex],
        lastReviewed: new Date().toISOString()
      }
      setWords(updatedWords)
      saveToLocalStorage('vocabulary', updatedWords)
      setProgress(((currentIndex + 1) / words.length) * 100)
    }
  }

  const prevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setShowMeaning(false)
      setProgress(((currentIndex - 1) / words.length) * 100)
    }
  }

  const toggleMastered = (id: string) => {
    const newMastered = new Set(mastered)
    if (mastered.has(id)) {
      newMastered.delete(id)
    } else {
      newMastered.add(id)
    }
    setMastered(newMastered)
  }

  const playAudio = async (word: string) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      const data = await response.json()
      const audioUrl = data[0]?.phonetics?.find((p: any) => p.audio)?.audio
      if (audioUrl) {
        const audio = new Audio(audioUrl)
        audio.play()
      }
    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }

  if (words.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
          <List className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
          生词本还是空的
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          快去添加一些单词开始学习吧！
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setReviewMode('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            reviewMode === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
          }`}
        >
          <List className="h-4 w-4" />
          顺序复习
        </button>
        <button
          onClick={() => setReviewMode('random')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md ${
            reviewMode === 'random'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
          }`}
        >
          <Shuffle className="h-4 w-4" />
          随机复习
        </button>
      </div>

      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="min-h-[300px] rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-3xl font-bold">{currentWord.word}</h2>
              <button
                onClick={() => playAudio(currentWord.word)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Volume2 className="h-5 w-5" />
              </button>
            </div>
            
            {!showMeaning ? (
              <button
                onClick={() => setShowMeaning(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Eye className="h-4 w-4" />
                显示释义
              </button>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => setShowMeaning(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  <EyeOff className="h-4 w-4" />
                  隐藏释义
                </button>
                <p className="text-xl">{currentWord.commonTranslation}</p>
                {currentWord.lastReviewed && (
                  <p className="text-sm text-muted-foreground">
                    上次复习: {new Date(currentWord.lastReviewed).toLocaleDateString()}
                  </p>
                )}
                <button
                  onClick={() => toggleMastered(currentWord.id)}
                  className={`mt-4 px-4 py-2 rounded-md text-sm ${
                    mastered.has(currentWord.id)
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mastered.has(currentWord.id) ? '已掌握' : '标记为已掌握'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={prevWord}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          上一个
        </button>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {words.length}
        </span>
        <button
          onClick={nextWord}
          disabled={currentIndex === words.length - 1}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50"
        >
          下一个
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        已掌握: {mastered.size} / {words.length} 个单词
      </div>
    </div>
  )
}
