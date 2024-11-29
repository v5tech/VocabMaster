"use client"

import { useState, useEffect } from 'react'
import { getFromLocalStorage, saveToLocalStorage, Word } from '@/lib/utils'
import { Search, Trash2, Calendar, Clock, ArrowUpDown } from 'lucide-react'

export default function VocabularyList() {
  const [words, setWords] = useState<Word[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'word'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    const savedWords = getFromLocalStorage('vocabulary') || []
    setWords(savedWords)
  }, [])

  const removeWord = (id: string) => {
    const updatedWords = words.filter(word => word.id !== id)
    setWords(updatedWords)
    saveToLocalStorage('vocabulary', updatedWords)
  }

  const handleSort = (type: 'date' | 'word') => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(type)
      setSortOrder('asc')
    }
  }

  const sortedWords = [...words].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()
        : new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    } else {
      return sortOrder === 'asc'
        ? a.word.localeCompare(b.word)
        : b.word.localeCompare(a.word)
    }
  })

  const filteredWords = sortedWords.filter(word => 
    word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索单词或释义"
            className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSort('word')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              sortBy === 'word' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            }`}
          >
            <ArrowUpDown className="h-4 w-4" />
            按单词排序
          </button>
          <button
            onClick={() => handleSort('date')}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
              sortBy === 'date' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            }`}
          >
            <Calendar className="h-4 w-4" />
            按时间排序
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredWords.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {searchTerm ? '没有找到匹配的单词' : '生词本还是空的'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {searchTerm ? '试试其他搜索词？' : '快去添加一些单词吧！'}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredWords.map(word => (
              <div
                key={word.id}
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{word.word}</h3>
                    <p className="text-sm text-muted-foreground">{word.meaning}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <p className="text-xs text-muted-foreground">
                        添加于 {new Date(word.addedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeWord(word.id)}
                    className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground text-center">
        共 {filteredWords.length} 个单词
      </div>
    </div>
  )
}
