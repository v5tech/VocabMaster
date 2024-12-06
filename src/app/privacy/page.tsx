'use client'

import { Shield } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PrivacyPage() {
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
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            隐私政策
          </h1>
          <p className="text-xl text-muted-foreground">
            我们如何保护您的隐私
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-zinc dark:prose-invert mx-auto"
        >
          <h2>数据收集</h2>
          <p>
            VocabMaster 是一个完全基于本地存储的应用程序。我们不会收集、存储或传输您的任何个人信息或使用数据。您的所有学习数据（包括词库和学习记录）都存储在您的浏览器本地存储中。
          </p>

          <h2>本地存储</h2>
          <p>
            我们使用浏览器的本地存储（LocalStorage）来保存以下信息：
          </p>
          <ul>
            <li>您保存的单词和释义</li>
            <li>学习进度和复习记录</li>
            <li>应用程序的基本设置</li>
          </ul>

          <h2>数据安全</h2>
          <p>
            由于所有数据都存储在本地，您的数据安全完全由您的设备安全性决定。我们建议您：
          </p>
          <ul>
            <li>定期备份重要的学习数据</li>
            <li>保持设备系统和浏览器的及时更新</li>
            <li>在共享设备上使用时注意保护个人隐私</li>
          </ul>

          <h2>第三方服务</h2>
          <p>
            我们的应用程序可能会使用以下第三方服务：
          </p>
          <ul>
            <li>单词释义和发音 API</li>
            <li>字体和图标资源</li>
          </ul>
          <p>
            这些服务仅用于提供基本功能，不会收集您的个人信息。
          </p>

          <h2>政策更新</h2>
          <p>
            我们可能会不时更新此隐私政策。任何重大变更都会通过应用程序通知您。继续使用我们的服务即表示您同意新的隐私政策。
          </p>

          <h2>联系我们</h2>
          <p>
            如果您对我们的隐私政策有任何疑问，请随时联系我们：
          </p>
          <ul>
            <li>电子邮件：privacy@vocabmaster.com</li>
          </ul>

          <div className="text-sm text-muted-foreground mt-8">
            最后更新时间：2024年3月
          </div>
        </motion.div>
      </div>
    </div>
  )
}
