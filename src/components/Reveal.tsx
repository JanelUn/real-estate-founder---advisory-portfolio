import React, { forwardRef, type ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';

const EASE = [0.22, 1, 0.36, 1] as const;

type MotionTag = keyof React.JSX.IntrinsicElements;

function getMotionComponent(tag: MotionTag) {
  return (motion as unknown as Record<string, React.ElementType>)[tag as string] ?? motion.div;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  /** 'inView' animates in once the element scrolls into view (default). 'mount' animates in immediately, for above-the-fold content. */
  trigger?: 'inView' | 'mount';
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  onClick?: () => void;
  id?: string;
  style?: React.CSSProperties;
}

export const Reveal = forwardRef<HTMLElement, RevealProps>(({
  children,
  className,
  as = 'div',
  trigger = 'inView',
  y = 16,
  delay = 0,
  duration = 0.6,
  once = true,
  onClick,
  id,
  style,
}, ref) => {
  const Component = getMotionComponent(as);
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration, delay, ease: EASE } },
  };

  const viewportProps = trigger === 'inView'
    ? { whileInView: 'visible', viewport: { once, margin: '-80px' } }
    : { animate: 'visible' };

  return (
    <Component ref={ref} className={className} id={id} style={style} onClick={onClick} variants={variants} initial="hidden" {...viewportProps}>
      {children}
    </Component>
  );
});
Reveal.displayName = 'Reveal';

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  trigger?: 'inView' | 'mount';
  once?: boolean;
  staggerDelay?: number;
  delay?: number;
  style?: React.CSSProperties;
}

export const StaggerReveal = forwardRef<HTMLElement, StaggerRevealProps>(({
  children,
  className,
  as = 'div',
  trigger = 'inView',
  once = true,
  staggerDelay = 0.08,
  delay = 0.05,
  style,
}, ref) => {
  const Component = getMotionComponent(as);
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
  };

  const viewportProps = trigger === 'inView'
    ? { whileInView: 'visible', viewport: { once, margin: '-80px' } }
    : { animate: 'visible' };

  return (
    <Component ref={ref} className={className} style={style} variants={variants} initial="hidden" {...viewportProps}>
      {children}
    </Component>
  );
});
StaggerReveal.displayName = 'StaggerReveal';

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
  y?: number;
  duration?: number;
  onClick?: () => void;
}

export const RevealItem: React.FC<RevealItemProps> = ({ children, className, as = 'div', y = 16, duration = 0.5, onClick }) => {
  const Component = getMotionComponent(as);
  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
  };

  return (
    <Component className={className} onClick={onClick} variants={variants}>
      {children}
    </Component>
  );
};
