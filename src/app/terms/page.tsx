"use client"

import { motion } from 'framer-motion'
import { Scale, UserCheck, Copyright, AlertCircle, BookOpen, FileText } from 'lucide-react'

export default function Terms() {
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
                <Scale className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">使用条款</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                请仔细阅读以下条款，这些条款规定了使用 VocabMaster 的权利和义务
              </p>
              <p className="text-sm text-muted-foreground">
                最后更新时间：2024年3月
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-20">
            {/* 服务说明 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">服务说明</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">
                  VocabMaster 是一个在线词汇学习平台，提供以下服务：
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>单词查询和释义展示</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>生词本管理功能</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>单词复习系统</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 用户责任 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">用户责任</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">使用本服务时，您同意：</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>遵守所有适用的法律法规</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>不会滥用或干扰服务的正常运行</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>对自己的账户活动负责</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>不会进行任何可能损害服务或其他用户的行为</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 知识产权 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Copyright className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">知识产权</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">关于知识产权，请注意：</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>VocabMaster 的所有内容和功能均受知识产权法保护</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>用户不得未经授权复制、修改或分发平台内容</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>词典数据来自合法授权的第三方服务</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 免责声明 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">免责声明</h2>
              </div>
              <div className="pl-15 space-y-4">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>我们不保证服务永远不会中断或出错</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>对于因使用或无法使用本服务而造成的任何损失，我们不承担责任</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>我们保留随时修改或终止服务的权利</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* 条款更新 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">条款更新</h2>
              </div>
              <div className="pl-15 space-y-4">
                <p className="text-muted-foreground">
                  我们可能会不时更新这些条款。当我们进行重大更改时：
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>会在网站显著位置发布通知</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>更新本页面的"最后更新时间"</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span>继续使用本服务即表示您同意新的条款</span>
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
