"use client"

import { useState, useEffect } from 'react'
import { getFromLocalStorage, saveToLocalStorage, Word } from '@/lib/utils'
import { Shuffle, List, ChevronLeft, ChevronRight, Eye, EyeOff, Volume2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-sm"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-700 shadow-md mb-6">
          <List className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          生词本还是空的
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          快去添加一些单词开始学习吧！
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setReviewMode('all')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-colors duration-200 ${
            reviewMode === 'all'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary/80 text-secondary-foreground hover:bg-secondary'
          }`}
        >
          <List className="h-4 w-4" />
          顺序复习
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setReviewMode('random')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-colors duration-200 ${
            reviewMode === 'random'
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-secondary/80 text-secondary-foreground hover:bg-secondary'
          }`}
        >
          <Shuffle className="h-4 w-4" />
          随机复习
        </motion.button>
      </div>

      <div className="relative w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary/80"
        />
      </div>

      <motion.div 
        layout
        className="min-h-[400px] rounded-xl border bg-gradient-to-br from-card/50 to-card shadow-sm overflow-hidden"
      >
        <div className="p-10">
          <motion.div 
            layout
            className="text-center space-y-6"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <motion.h2 
                key={currentWord.word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent"
              >
                {currentWord.word}
              </motion.h2>
              <div className="flex items-center gap-3">
                {currentWord.phonetic && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg text-muted-foreground font-medium"
                  >
                    {currentWord.phonetic}
                  </motion.p>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => playAudio(currentWord.word)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Volume2 className="h-5 w-5 text-primary" />
                </motion.button>
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              {!showMeaning ? (
                <motion.button
                  key="show-button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={() => setShowMeaning(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  显示释义
                </motion.button>
              ) : (
                <motion.div
                  key="meaning-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <button
                    onClick={() => setShowMeaning(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm transition-colors"
                  >
                    <EyeOff className="h-4 w-4" />
                    隐藏释义
                  </button>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-medium text-gray-800 dark:text-gray-200"
                  >
                    {currentWord.commonTranslation}
                  </motion.p>
                  {currentWord.lastReviewed && (
                    <p className="text-sm text-muted-foreground">
                      上次复习: {new Date(currentWord.lastReviewed).toLocaleDateString()}
                    </p>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleMastered(currentWord.id)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      mastered.has(currentWord.id)
                        ? 'bg-green-500 text-white hover:bg-green-600 shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {mastered.has(currentWord.id) ? '已掌握' : '标记为已掌握'}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={prevWord}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
        >
          <ChevronLeft className="h-4 w-4" />
          上一个
        </motion.button>
        <span className="text-sm font-medium text-muted-foreground">
          {currentIndex + 1} / {words.length}
        </span>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextWord}
          disabled={currentIndex === words.length - 1}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
        >
          下一个
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
          已掌握: {mastered.size} / {words.length} 个单词
        </span>
      </div>
    </div>
  )
}
