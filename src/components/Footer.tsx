'use client'

import { Github, Twitter, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: '关于我们', href: '/about' },
    { label: '隐私政策', href: '/privacy' },
    { label: '使用条款', href: '/terms' }
  ]

  return (
    <footer className="relative w-full border-t bg-gradient-to-b from-background/80 to-background/60 backdrop-blur-md">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2" />
        <div className="absolute -top-24 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2" />
      </div>

      <div className="container relative mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center space-y-10">
          {/* Brand Section */}
          <div className="text-center space-y-4">
            <Link 
              href="/" 
              className="group inline-flex flex-col items-center gap-2 transition-transform hover:scale-105"
            >
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary/90 via-primary to-primary/90 bg-clip-text text-transparent">
                VocabMaster
              </span>
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all duration-300" />
            </Link>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-md mx-auto">
              让词汇学习更简单、更高效，助你轻松掌握新知识
            </p>
          </div>

          {/* Bottom Section */}
          <div className="w-full max-w-6xl mx-auto pt-8 border-t border-border/30">
            {/* All elements in one row */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
              {/* Social Links - Left */}
              <div className="flex items-center gap-6">
                <Link 
                  href="https://github.com/vocabmaster" 
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://twitter.com/vocabmaster" 
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link 
                  href="mailto:contact@vocabmaster.com" 
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>

              {/* Copyright - Center */}
              <p className="text-xs md:text-sm text-muted-foreground/60 order-last md:order-none">
                {currentYear} VocabMaster. All rights reserved.
              </p>

              {/* Text Links - Right */}
              <div className="flex items-center gap-8">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="relative text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-200 group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/60 group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
