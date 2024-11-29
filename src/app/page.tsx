"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WordLookup from "@/components/WordLookup"
import VocabularyList from "@/components/VocabularyList"
import WordReview from "@/components/WordReview"
import { BookOpen, Search, RefreshCw } from "lucide-react"
import { TabProvider, useTab } from "@/contexts/TabContext"
import Banner from '@/components/Banner'

function HomeContent() {
  const { activeTab, setActiveTab } = useTab()

  return (
    <main className="min-h-screen bg-background">
      <Banner />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="lookup" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>查词</span>
            </TabsTrigger>
            <TabsTrigger value="vocabulary" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>词库</span>
            </TabsTrigger>
            <TabsTrigger value="review" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>复习</span>
            </TabsTrigger>
          </TabsList>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            {activeTab === 'lookup' && <WordLookup />}
            {activeTab === 'vocabulary' && <VocabularyList />}
            {activeTab === 'review' && <WordReview />}
          </div>
        </Tabs>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <TabProvider>
      <HomeContent />
    </TabProvider>
  )
}
