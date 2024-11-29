'use client'

import { GraduationCap, BookOpen, Brain, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Banner() {
  return (
    <section className="relative py-20 overflow-hidden border-b">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background">
        <div className="absolute inset-0 bg-grid-primary opacity-10" />
      </div>

      {/* 内容 */}
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo和标题 */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-primary/10">
              <GraduationCap className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
              VocabMaster
            </h1>
          </div>

          {/* Slogan */}
          <p className="text-xl sm:text-2xl text-foreground/80 font-medium leading-relaxed mb-12">
            探索词汇的无限可能，构建你的语言宝库
          </p>
          
          {/* 特性列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-foreground/70">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>智能词典</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-foreground/70">
              <Brain className="w-5 h-5 text-primary" />
              <span>深度释义</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-foreground/70">
              <Sparkles className="w-5 h-5 text-primary" />
              <span>循序渐进</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
