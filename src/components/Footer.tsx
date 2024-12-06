'use client'

import { Github, Heart, Twitter, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: '关于',
      links: [
        { label: '关于我们', href: '/about' },
        { label: '联系我们', href: 'mailto:contact@vocabmaster.com' },
        { label: 'GitHub', href: 'https://github.com/vocabmaster' },
      ]
    },
    {
      title: '法律',
      links: [
        { label: '隐私政策', href: '/privacy' },
        { label: '使用条款', href: '/terms' },
        { label: '版权声明', href: '/terms#copyright' },
      ]
    },
    {
      title: '社区',
      links: [
        { label: '反馈建议', href: 'mailto:feedback@vocabmaster.com' },
        { label: '帮助中心', href: '/about#help' },
        { label: '更新日志', href: '/about#changelog' },
      ]
    }
  ]

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                VocabMaster
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              让词汇学习更简单、更高效
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/vocabmaster" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/vocabmaster" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="mailto:contact@vocabmaster.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground order-2 md:order-1">
            {currentYear} VocabMaster. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground order-1 md:order-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by VocabMaster Team</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
