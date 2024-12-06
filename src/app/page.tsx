"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WordLookup from "@/components/WordLookup"
import VocabularyList from "@/components/VocabularyList"
import WordReview from "@/components/WordReview"
import { BookOpen, Search, RefreshCw } from "lucide-react"
import { TabProvider, useTab } from "@/contexts/TabContext"
import Banner from '@/components/Banner'
import { motion, AnimatePresence } from "framer-motion"

function HomeContent() {
  const { activeTab, setActiveTab } = useTab()

  const tabVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Banner />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 p-1 bg-background/95 backdrop-blur-sm border rounded-xl shadow-sm h-[52px]">
            <TabsTrigger 
              value="lookup" 
              className="flex items-center justify-center gap-3 h-full text-base font-medium transition-all duration-300 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:scale-105 rounded-lg"
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">查词</span>
            </TabsTrigger>
            <TabsTrigger 
              value="vocabulary" 
              className="flex items-center justify-center gap-3 h-full text-base font-medium transition-all duration-300 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:scale-105 rounded-lg"
            >
              <BookOpen className="h-5 w-5" />
              <span className="hidden sm:inline">词库</span>
            </TabsTrigger>
            <TabsTrigger 
              value="review" 
              className="flex items-center justify-center gap-3 h-full text-base font-medium transition-all duration-300 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:scale-105 rounded-lg"
            >
              <RefreshCw className="h-5 w-5" />
              <span className="hidden sm:inline">复习</span>
            </TabsTrigger>
          </TabsList>

          <div className="relative bg-card rounded-xl border shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-6"
              >
                {activeTab === 'lookup' && <WordLookup />}
                {activeTab === 'vocabulary' && <VocabularyList />}
                {activeTab === 'review' && <WordReview />}
              </motion.div>
            </AnimatePresence>
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
