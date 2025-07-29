import React from 'react';
import { useTimer } from 'react-timer-hook';

interface TimerProps {
  expiryTimestamp: number; // dalam bentuk timestamp (UNIX ms)
}

const Timer: React.FC<TimerProps> = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: new Date(expiryTimestamp), // <-- ini diperbaiki
  });

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <div className="flex justify-center items-center space-x-4">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary-400 bg-slate-800/50 px-4 py-2 rounded-lg">
          {formatTime(hours)}
        </div>
        <div className="text-sm text-slate-400 mt-1">Jam</div>
      </div>
      <div className="text-4xl font-bold text-slate-500">:</div>
      <div className="text-center">
        <div className="text-4xl font-bold text-primary-400 bg-slate-800/50 px-4 py-2 rounded-lg">
          {formatTime(minutes)}
        </div>
        <div className="text-sm text-slate-400 mt-1">Menit</div>
      </div>
      <div className="text-4xl font-bold text-slate-500">:</div>
      <div className="text-center">
        <div className="text-4xl font-bold text-primary-400 bg-slate-800/50 px-4 py-2 rounded-lg">
          {formatTime(seconds)}
        </div>
        <div className="text-sm text-slate-400 mt-1">Detik</div>
      </div>
    </div>
  );
};

export default Timer;
