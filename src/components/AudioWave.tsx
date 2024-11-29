"use client"

import { motion } from 'framer-motion'

interface AudioWaveProps {
  isPlaying: boolean
  className?: string
}

export default function AudioWave({ isPlaying, className = '' }: AudioWaveProps) {
  return (
    <motion.div 
      className={`flex items-center gap-0.5 h-5 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isPlaying ? (
        <>
          <motion.span
            className="w-0.5 bg-primary rounded-full"
            animate={{
              height: ['8px', '16px', '8px'],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0
            }}
          />
          <motion.span
            className="w-0.5 bg-primary rounded-full"
            animate={{
              height: ['8px', '12px', '8px'],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.1
            }}
          />
          <motion.span
            className="w-0.5 bg-primary rounded-full"
            animate={{
              height: ['8px', '14px', '8px'],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2
            }}
          />
        </>
      ) : (
        <>
          <motion.span
            className="w-0.5 bg-primary rounded-full"
            animate={{
              height: '8px'
            }}
            transition={{
              duration: 0.5,
              repeat: 1,
              ease: 'easeInOut',
              delay: 0
            }}
          />
          <motion.span
            className="w-0.5 bg-primary rounded-full"
            animate={{
              height: '8px'
            }}
            transition={{
              duration: 0.5,
              repeat: 1,
              ease: 'easeInOut',
              delay: 0.1
            }}
          />
          <motion.span
            className="w-0.5 bg-primary rounded-full"
            animate={{
              height: '8px'
            }}
            transition={{
              duration: 0.5,
              repeat: 1,
              ease: 'easeInOut',
              delay: 0.2
            }}
          />
        </>
      )}
    </motion.div>
  )
}
