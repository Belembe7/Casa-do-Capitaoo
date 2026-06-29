export const staggerEntryFrom = [
  { x: -72, y: 24, rotate: -3 },
  { x: 48, y: -56, rotate: 2 },
  { x: 64, y: 32, rotate: -2 },
  { x: -40, y: 64, rotate: 3 },
  { x: -56, y: -40, rotate: -1 },
  { x: 72, y: 48, rotate: 2 },
];

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.32,
      delayChildren: 0.2,
    },
  },
};

export function staggerItemVariants(index: number) {
  const from = staggerEntryFrom[index % staggerEntryFrom.length];
  return {
    hidden: {
      opacity: 0,
      x: from.x,
      y: from.y,
      rotate: from.rotate,
      scale: 0.88,
      filter: 'blur(6px)',
      transition: {
        duration: 0.9,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
}

export const staggerInViewOptions = {
  once: false as const,
  margin: '-80px' as const,
  amount: 0.25 as const,
};
