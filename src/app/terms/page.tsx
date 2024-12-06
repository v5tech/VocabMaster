'use client'

import { Scale } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TermsPage() {
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
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
            使用条款
          </h1>
          <p className="text-xl text-muted-foreground">
            请仔细阅读以下条款
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-zinc dark:prose-invert mx-auto"
        >
          <h2>接受条款</h2>
          <p>
            通过访问和使用 VocabMaster，您同意受这些条款的约束。如果您不同意这些条款的任何部分，请不要使用我们的服务。
          </p>

          <h2>服务说明</h2>
          <p>
            VocabMaster 是一个在线词汇学习工具，提供以下功能：
          </p>
          <ul>
            <li>英文单词查询和释义</li>
            <li>个人词库管理</li>
            <li>单词复习系统</li>
            <li>发音功能</li>
          </ul>

          <h2>用户责任</h2>
          <p>
            作为用户，您同意：
          </p>
          <ul>
            <li>不会以任何方式干扰服务的正常运行</li>
            <li>不会尝试未经授权访问我们的系统或网络</li>
            <li>对您的学习数据负责，包括定期备份</li>
            <li>遵守所有适用的法律和法规</li>
          </ul>

          <h2>知识产权</h2>
          <p>
            VocabMaster 的所有内容，包括但不限于文本、图形、代码、图标和整体设计，均受版权法保护。未经明确许可，不得：
          </p>
          <ul>
            <li>复制或分发我们的内容</li>
            <li>修改或创建衍生作品</li>
            <li>将我们的内容用于商业目的</li>
          </ul>

          <h2>免责声明</h2>
          <p>
            我们的服务按"原样"提供，不提供任何明示或暗示的保证。我们不保证：
          </p>
          <ul>
            <li>服务将不间断或无错误</li>
            <li>所有内容的完整性或准确性</li>
            <li>服务将满足您的特定需求</li>
          </ul>

          <h2>服务变更</h2>
          <p>
            我们保留随时修改或终止服务的权利，恕不另行通知。我们不对服务的任何修改、暂停或终止向您或任何第三方承担责任。
          </p>

          <h2>适用法律</h2>
          <p>
            这些条款受中华人民共和国法律管辖。任何与这些条款相关的争议应提交至有管辖权的法院解决。
          </p>

          <h2>联系方式</h2>
          <p>
            如果您对这些条款有任何疑问，请联系我们：
          </p>
          <ul>
            <li>电子邮件：terms@vocabmaster.com</li>
          </ul>

          <div className="text-sm text-muted-foreground mt-8">
            最后更新时间：2024年3月
          </div>
        </motion.div>
      </div>
    </div>
  )
}
