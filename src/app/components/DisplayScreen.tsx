import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface DisplayScreenProps {
  currentProjectIndex: number;
  currentProjectTitle: string;
  activeControl: string | null;
  controlValue: string | null;
  disciplineValues?: {
    architecture: number;
    productDesign: number;
    software: number;
  };
}

export function DisplayScreen({ 
  currentProjectIndex, 
  currentProjectTitle, 
  activeControl, 
  controlValue,
  disciplineValues 
}: DisplayScreenProps) {
  const [idleMode, setIdleMode] = useState(false);
  const [idleCycle, setIdleCycle] = useState(0);

  // Idle animation - cycle through discipline percentages
  useEffect(() => {
    if (activeControl) {
      setIdleMode(false);
      return;
    }

    const timer = setTimeout(() => {
      setIdleMode(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeControl]);

  useEffect(() => {
    if (!idleMode) return;

    const interval = setInterval(() => {
      setIdleCycle(prev => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, [idleMode]);

  const getDisplayContent = () => {
    // Show active control info
    if (activeControl && controlValue) {
      return {
        line1: activeControl,
        line2: controlValue,
      };
    }

    // Show project number/code
    if (!idleMode) {
      return {
        line1: currentProjectIndex === 0 ? 'AM' : `0${currentProjectIndex}`,
        line2: '',
      };
    }

    // Idle mode - cycle through disciplines
    if (disciplineValues) {
      const disciplines = [
        { name: 'ARCH', value: disciplineValues.architecture },
        { name: 'PROD', value: disciplineValues.productDesign },
        { name: 'SOFT', value: disciplineValues.software },
      ];
      const current = disciplines[idleCycle];
      return {
        line1: current.name,
        line2: `${Math.round(current.value)}%`,
      };
    }

    return {
      line1: currentProjectIndex === 0 ? 'AM' : `0${currentProjectIndex}`,
      line2: '',
    };
  };

  const content = getDisplayContent();

  return (
    <div
      className="relative rounded-sm overflow-hidden"
      style={{
        width: '96px',
        height: '72px',
        background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
        boxShadow: 'inset 3px 3px 6px #000000, inset -3px -3px 6px #3a3a3a',
      }}
    >
      {/* LCD glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent pointer-events-none" />
      
      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)',
        }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center font-mono text-green-400 px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${content.line1}-${content.line2}`}
            className="text-center"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-[16px] font-bold tracking-wider leading-tight">
              {content.line1}
            </div>
            {content.line2 && (
              <div className="text-[13px] opacity-80 leading-tight mt-1">
                {content.line2}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LCD flicker effect */}
      <motion.div
        className="absolute inset-0 bg-green-400 pointer-events-none"
        animate={{ opacity: [0, 0.05, 0] }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    </div>
  );
}