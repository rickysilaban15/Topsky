import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface StepProps {
  number: number;
  label: string;
  active: boolean;
  done: boolean;
}

const Step: React.FC<StepProps> = ({ number, label, active, done }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
          ${done ? 'bg-primary-500 border-primary-500' : ''}
          ${active && !done ? 'bg-primary-500/20 border-primary-500' : ''}
          ${!active && !done ? 'bg-slate-700 border-slate-600' : ''}
        `}
        animate={active && !done ? { scale: [1, 1.1, 1] } : {}}
        transition={active && !done ? { repeat: Infinity, duration: 1.5 } : {}}
      >
        {done ? (
          <Check className="w-6 h-6 text-white" />
        ) : (
          <span className={`font-bold ${active ? 'text-primary-300' : 'text-slate-400'}`}>
            {number}
          </span>
        )}
      </motion.div>
      <p className={`text-xs text-center transition-colors duration-300 ${active ? 'text-slate-200 font-semibold' : 'text-slate-500'}`}>
        {label}
      </p>
    </div>
  );
};

export default Step;
