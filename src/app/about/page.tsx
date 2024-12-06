"use client"

import { motion } from 'framer-motion'
import { GraduationCap, Book, Code2, Heart, Target, Sparkles, Brain, Globe2 } from 'lucide-react'

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background">
          <div className="absolute inset-0 bg-grid-primary opacity-10" />
        </div>
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="p-3 rounded-2xl bg-primary/10 inline-block">
                <GraduationCap className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">关于 VocabMaster</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                打造最智能、最人性化的词汇学习平台，让每个人都能轻松掌握新语言
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-20">
            {/* 使命与愿景 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">使命与愿景</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">
                  VocabMaster 致力于通过先进的技术和科学的学习方法，帮助学习者更高效地掌握词汇。我们的愿景是：
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>让词汇学习变得简单有趣</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>为每个学习者提供个性化的学习体验</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>打破语言障碍，连接世界</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 核心功能 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">核心功能</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <Book className="w-8 h-8 text-primary" />
                    <h3 className="text-lg font-semibold">智能词典</h3>
                  </div>
                  <p className="text-muted-foreground">
                    整合多个权威词典，提供准确释义、例句和发音指导
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <Brain className="w-8 h-8 text-primary" />
                    <h3 className="text-lg font-semibold">智能复习</h3>
                  </div>
                  <p className="text-muted-foreground">
                    基于遗忘曲线，为您安排最佳复习时间
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <Globe2 className="w-8 h-8 text-primary" />
                    <h3 className="text-lg font-semibold">多语言支持</h3>
                  </div>
                  <p className="text-muted-foreground">
                    支持中英文双语界面，未来将支持更多语言
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card hover:bg-card/80 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <Book className="w-8 h-8 text-primary" />
                    <h3 className="text-lg font-semibold">生词本管理</h3>
                  </div>
                  <p className="text-muted-foreground">
                    轻松保存和管理生词，支持标签分类和笔记
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 技术支持 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">技术支持</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">
                  我们使用最新的技术栈，确保应用的性能和可靠性：
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Next.js 13 框架提供最佳性能和用户体验</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>TypeScript 确保代码质量和可维护性</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Tailwind CSS 实现现代化的响应式设计</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Framer Motion 带来流畅的动画效果</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 致谢 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">致谢</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">
                  感谢以下开源项目和服务的支持：
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Free Dictionary API 提供词典数据支持</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>Lucide Icons 提供精美图标</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>开源社区的所有贡献者</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
