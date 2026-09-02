import React, { useState, useEffect, useRef } from 'react';
import { STATS_DATA } from '../data/resourcesData';
import { Globe2, Building2, ShieldCheck, Award, Sparkles } from 'lucide-react';

const statIcons = [Globe2, Building2, Award, ShieldCheck];

interface AnimatedStatCardProps {
  stat: typeof STATS_DATA[0];
  Icon: React.ComponentType<{ className?: string }>;
  isVisible: boolean;
}

const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({ stat, Icon, isVisible }) => {
  const [displayCount, setDisplayCount] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const startCounting = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const duration = 2000; // 2.0 seconds smooth count
    const startTime = performance.now();
    const target = stat.value;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out expo formula for smooth natural deceleration
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.round(easeProgress * target);

      setDisplayCount(currentVal);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(updateCounter);
      } else {
        setDisplayCount(target);
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateCounter);
  };

  useEffect(() => {
    if (isVisible) {
      startCounting();
    } else {
      setDisplayCount(0);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, stat.value]);

  return (
    <div
      id={`stat-item-${stat.id}`}
      onMouseEnter={() => startCounting()}
      className="p-6 rounded-3xl bg-white border border-red-100 hover:border-red-300 hover:shadow-xl hover:shadow-red-950/5 transition-all duration-300 text-center sm:text-left space-y-3 group hover:-translate-y-1 cursor-default"
    >
      <div className="flex items-center justify-center sm:justify-start gap-3.5">
        <div className="p-3.5 rounded-2xl bg-red-50 text-[#DB0303] group-hover:bg-[#DB0303] group-hover:text-white transition-all duration-300 shadow-xs group-hover:scale-110">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl sm:text-4xl font-black font-heading text-slate-900 tracking-tight group-hover:text-[#DB0303] transition-colors tabular-nums">
            {displayCount}
          </span>
          <span className="text-2xl sm:text-3xl font-black font-heading text-[#DB0303] ml-0.5">
            {stat.suffix}
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-extrabold text-slate-900 font-heading">
          {stat.label}
        </h4>
        <p className="text-xs text-slate-500 mt-1 leading-snug font-medium">
          {stat.sublabel}
        </p>
      </div>
    </div>
  );
};

export const StatsCounter: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="stats-section"
      ref={sectionRef}
      className="py-16 bg-white relative overflow-hidden border-y border-red-100"
    >
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-50/40 via-white to-red-50/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <AnimatedStatCard
                key={stat.id}
                stat={stat}
                Icon={Icon}
                isVisible={isVisible}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

