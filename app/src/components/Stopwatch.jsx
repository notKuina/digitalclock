// src/components/Stopwatch.jsx
import { useState, useRef } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0); // in seconds
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  const formatTime = (t) => {
    const hrs = Math.floor(t / 3600);
    const mins = Math.floor((t % 3600) / 60);
    const secs = t % 60;
    return `${hrs.toString().padStart(2,"0")}:${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;
  };

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur shadow-xl text-center">
      <h2 className="text-lg text-gray-400 mb-3">Stopwatch</h2>
      <div className="text-3xl text-cyan-400 font-mono mb-4 drop-shadow-[0_0_10px_cyan]">
        {formatTime(time)}
      </div>
      <div className="space-x-2">
        {!running && <button onClick={start} className="bg-cyan-500 px-3 py-1 rounded">Start</button>}
        {running && <button onClick={stop} className="bg-red-500 px-3 py-1 rounded">Stop</button>}
        <button onClick={reset} className="bg-yellow-500 px-3 py-1 rounded">Reset</button>
      </div>
    </div>
  );
}