'use client'

import { GraduationCap, BookOpen, RefreshCw, Search } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Search,
    title: '智能查词',
    description: '支持英文单词查询，提供详细释义、例句和发音。'
  },
  {
    icon: BookOpen,
    title: '个人词库',
    description: '保存重要单词到个人词库，方便随时复习和回顾。'
  },
  {
    icon: RefreshCw,
    title: '科学复习',
    description: '支持顺序和随机复习模式，帮助你更好地记住单词。'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="mx-auto w-16 h-16 mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            关于 VocabMaster
          </h1>
          <p className="text-xl text-muted-foreground">
            你的智能词汇学习助手
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-lg border bg-card shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-zinc dark:prose-invert mx-auto"
        >
          <h2>我们的使命</h2>
          <p>
            VocabMaster 致力于为学习者提供一个简单、高效的词汇学习平台。我们相信，掌握一门语言的关键在于构建丰富的词汇量，而科学的学习方法和持续的复习是达成这一目标的重要手段。
          </p>
          
          <h2>技术支持</h2>
          <p>
            我们采用最新的 Web 技术构建，包括 Next.js、React 和 Tailwind CSS，确保了良好的性能和用户体验。所有数据都存储在本地，保护您的隐私安全。
          </p>

          <h2>联系我们</h2>
          <p>
            如果您有任何问题、建议或反馈，欢迎通过以下方式联系我们：
          </p>
          <ul>
            <li>电子邮件：support@vocabmaster.com</li>
            <li>GitHub：github.com/vocabmaster</li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
