import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WordLookup from "@/components/WordLookup"
import VocabularyList from "@/components/VocabularyList"
import WordReview from "@/components/WordReview"
import { BookOpen, Search, RefreshCw } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 max-w-4xl pt-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            词汇学习助手
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            通过智能学习方式，轻松掌握英语词汇。查询、记录、复习，一站式解决您的词汇学习需求。
          </p>
        </div>
        
        <Tabs defaultValue="lookup" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-14 items-center gap-4 rounded-lg p-1">
            <TabsTrigger value="lookup" className="flex items-center gap-2 h-12">
              <Search className="h-4 w-4" />
              <span>单词查询</span>
            </TabsTrigger>
            <TabsTrigger value="vocabulary" className="flex items-center gap-2 h-12">
              <BookOpen className="h-4 w-4" />
              <span>生词本</span>
            </TabsTrigger>
            <TabsTrigger value="review" className="flex items-center gap-2 h-12">
              <RefreshCw className="h-4 w-4" />
              <span>单词复习</span>
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="lookup" className="border rounded-lg p-6">
              <WordLookup />
            </TabsContent>
            <TabsContent value="vocabulary" className="border rounded-lg p-6">
              <VocabularyList />
            </TabsContent>
            <TabsContent value="review" className="border rounded-lg p-6">
              <WordReview />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </main>
  )
}
