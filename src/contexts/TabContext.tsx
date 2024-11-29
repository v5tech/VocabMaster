"use client"

import React, { createContext, useContext, useState } from 'react'

interface TabContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  selectedWord: string | null
  setSelectedWord: (word: string | null) => void
}

const TabContext = createContext<TabContextType | undefined>(undefined)

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('lookup')
  const [selectedWord, setSelectedWord] = useState<string | null>(null)

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, selectedWord, setSelectedWord }}>
      {children}
    </TabContext.Provider>
  )
}

export function useTab() {
  const context = useContext(TabContext)
  if (context === undefined) {
    throw new Error('useTab must be used within a TabProvider')
  }
  return context
}
