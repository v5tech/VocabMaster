"use client"

import { motion } from 'framer-motion'
import { Shield, Lock, Cookie, Database, Server, Eye, Bell } from 'lucide-react'

export default function Privacy() {
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
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">隐私政策</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                我们重视您的隐私，并致力于保护您的个人信息
              </p>
              <p className="text-sm text-muted-foreground">
                最后更新时间：2024年3月
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-20">
            {/* 数据收集 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">数据收集</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">我们收集的信息包括：</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>您添加到生词本的单词和学习记录</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>学习进度和复习统计数据</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>基本的使用统计信息，如访问时间和功能使用频率</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 数据使用 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">数据使用</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">我们使用收集的信息：</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>为您提供个性化的学习体验和复习建议</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>改进我们的服务和用户体验</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>生成匿名的使用统计数据</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 数据安全 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">数据安全</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">
                  我们采取多重措施保护您的数据安全：
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>所有数据都存储在本地，确保您完全控制自己的数据</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>使用安全的数据存储方式，防止未经授权的访问</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>定期进行安全审查和更新</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Cookie 政策 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Cookie 政策</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">
                  我们使用必要的 Cookie 来：
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>保存您的偏好设置（如深色模式）</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>提供基本的网站功能</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>改善网站性能和用户体验</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 隐私政策更新 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">隐私政策更新</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">
                  我们可能会不时更新本隐私政策。当我们进行重大更改时，我们将：
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>在网站显著位置发布通知</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>更新本页面的"最后更新时间"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>必要时通过应用内通知告知用户</span>
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
