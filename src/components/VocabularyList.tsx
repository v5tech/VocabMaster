"use client"

import { useState, useEffect, useMemo } from 'react'
import { getFromLocalStorage, saveToLocalStorage, Word } from '@/lib/utils'
import { Trash2, Search, Clock, ArrowUpDown, BookOpen, Volume2, Loader2, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTab } from '@/contexts/TabContext'

export default function VocabularyList() {
  const [vocabulary, setVocabulary] = useState<Word[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'word'>('date')
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({})
  const { setSelectedWord, setActiveTab } = useTab()

  useEffect(() => {
    const savedVocabulary = getFromLocalStorage('vocabulary') || []
    setVocabulary(savedVocabulary)
  }, [])

  const handleDelete = (wordId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newVocabulary = vocabulary.filter(item => item.id !== wordId)
    setVocabulary(newVocabulary)
    saveToLocalStorage('vocabulary', newVocabulary)
  }

  const handleSort = (type: 'date' | 'word') => {
    setSortBy(type)
  }

  const handleWordClick = (word: string) => {
    setSelectedWord(word)
    setActiveTab('lookup')
  }

  const playAudio = async (audioUrl: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioUrl) return
    
    setPlayingStates(prev => ({ ...prev, [audioUrl]: true }))
    const audio = new Audio(audioUrl)
    
    try {
      await audio.play()
      audio.onended = () => setPlayingStates(prev => ({ ...prev, [audioUrl]: false }))
    } catch (error) {
      console.error("Error playing audio:", error)
      setPlayingStates(prev => ({ ...prev, [audioUrl]: false }))
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const sortedAndFilteredVocabulary = useMemo(() => 
    vocabulary
      .filter(item =>
        item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.commonTranslation?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'word') {
          return a.word.localeCompare(b.word)
        }
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      })
  , [vocabulary, searchTerm, sortBy])

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索单词或释义..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border bg-card/50 hover:bg-card focus:bg-card transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSort('word')}
            className={`px-4 py-2.5 rounded-xl border inline-flex items-center gap-2 transition-all duration-200 ${
              sortBy === 'word' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-card/50 hover:bg-card text-foreground'
            }`}
          >
            <ArrowUpDown className="h-4 w-4" />
            按单词
          </button>
          <button
            onClick={() => handleSort('date')}
            className={`px-4 py-2.5 rounded-xl border inline-flex items-center gap-2 transition-all duration-200 ${
              sortBy === 'date' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-card/50 hover:bg-card text-foreground'
            }`}
          >
            <Clock className="h-4 w-4" />
            按时间
          </button>
        </div>
      </div>

      {/* Vocabulary List */}
      <AnimatePresence mode="popLayout">
        <div className="grid gap-4">
          {sortedAndFilteredVocabulary.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => handleWordClick(item.word)}
              className="group relative rounded-xl border bg-gradient-to-br from-card to-card/95 hover:from-accent/20 hover:to-accent/5 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-4">
                <div className="flex items-start justify-between gap-3">
                  {/* Word Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-lg font-semibold tracking-tight truncate">
                        {item.word}
                      </h3>
                      {item.phonetic && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-muted-foreground">
                            {item.phonetic}
                          </span>
                          {item.phoneticAudio && (
                            <button
                              onClick={(e) => playAudio(item.phoneticAudio!, e)}
                              className="relative p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                              disabled={playingStates[item.phoneticAudio]}
                              title="播放发音"
                            >
                              <AnimatePresence mode="wait">
                                {playingStates[item.phoneticAudio] ? (
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
                          )}
                        </div>
                      )}
                    </div>
                    {item.commonTranslation && (
                      <p className="text-base text-muted-foreground">
                        {item.commonTranslation}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive active:scale-95 transition-all duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-2 pt-2 border-t border-border/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>添加于 {formatDate(item.addedAt)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Empty State */}
      {sortedAndFilteredVocabulary.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-card/50 to-card p-10"
        >
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative text-center space-y-4">
            <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">
                {searchTerm ? '没有找到匹配的单词' : '词库是空的'}
              </p>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? '试试其他搜索词？' : '快去添加一些单词吧！'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
