"use client"

import { useState, useEffect, useMemo } from 'react'
import { getFromLocalStorage, saveToLocalStorage, Word } from '@/lib/utils'
import { Trash2, Search, Clock, ArrowUpDown, BookOpen, Volume2, Loader2 } from 'lucide-react'
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
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索单词..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSort('word')}
            className={`px-3 py-2 rounded-lg border inline-flex items-center gap-2 ${
              sortBy === 'word' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'
            }`}
          >
            <ArrowUpDown className="h-4 w-4" />
            按单词
          </button>
          <button
            onClick={() => handleSort('date')}
            className={`px-3 py-2 rounded-lg border inline-flex items-center gap-2 ${
              sortBy === 'date' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted'
            }`}
          >
            <Clock className="h-4 w-4" />
            按时间
          </button>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="grid gap-3">
          {sortedAndFilteredVocabulary.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={() => handleWordClick(item.word)}
              className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-card/50 to-card hover:from-accent/30 hover:to-accent/10 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-medium tracking-tight truncate">
                        {item.word}
                      </h3>
                      {item.phonetic && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground font-medium">
                            {item.phonetic}
                          </span>
                          {item.phoneticAudio && (
                            <button
                              onClick={(e) => playAudio(item.phoneticAudio!, e)}
                              className="inline-flex items-center justify-center rounded-full h-7 w-7 bg-primary/10 hover:bg-primary/20 transition-colors"
                              disabled={playingStates[item.phoneticAudio]}
                            >
                              {playingStates[item.phoneticAudio] ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                              ) : (
                                <Volume2 className="h-3.5 w-3.5 text-primary" />
                              )}
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

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 -translate-x-4 group-hover:translate-x-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>添加于 {formatDate(item.addedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-primary/60">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>点击查看详情</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {sortedAndFilteredVocabulary.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-card/50 to-card p-8"
        >
          <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="relative text-center space-y-3">
            <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <p className="text-lg font-medium text-foreground">
              {searchTerm ? '没有找到匹配的单词' : '词库是空的'}
            </p>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? '试试其他搜索词？' : '快去添加一些单词吧！'}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
