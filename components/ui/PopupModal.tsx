'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PopupModalProps {
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function PopupModal({
  image,
  title,
  description,
  ctaText,
  ctaLink,
}: PopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('popup-seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('popup-seen', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-lg w-full bg-white overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-white hover:text-secondary transition-colors"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
            <div className="relative h-64">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
            <div className="p-8 text-center">
              <h3 className="font-display text-2xl mb-3">{title}</h3>
              <p className="text-text-light mb-6">{description}</p>
              <Link href={ctaLink} className="btn-primary">
                {ctaText}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
