'use client';

import { motion } from 'framer-motion';

interface ContentBlock {
  type: 'h2' | 'p';
  text: string;
}

function parseContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'h2', text: trimmed.replace('## ', '') });
    } else {
      blocks.push({ type: 'p', text: trimmed });
    }
  }

  return blocks;
}

export default function BlogPostAnimatedContent({ content }: { content: string }) {
  const blocks = parseContent(content);

  return (
    <div className="max-w-none text-text-light leading-relaxed">
      {blocks.map((block, i) => (
        <motion.div
          key={`${block.type}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 1.8,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {block.type === 'h2' ? (
            <h2 className="font-display text-2xl text-primary mt-10 mb-3 first:mt-0">
              {block.text}
            </h2>
          ) : (
            <p className="mb-5 text-base md:text-lg leading-relaxed">{block.text}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
