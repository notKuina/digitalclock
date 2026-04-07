import { useState, useRef } from "react";

export default function Timer() {
  const [time, setTime] = useState(0); // in seconds
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const [input, setInput] = useState(""); // in minutes

  const start = () => {
    if (running || time <= 0) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    stop();
    setTime(input * 60);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(val);
    setTime(val * 60);
  };

  const formatTime = (t) => {
    const hrs = Math.floor(t / 3600);
    const mins = Math.floor((t % 3600) / 60);
    const secs = t % 60;
    return `${hrs.toString().padStart(2,"0")}:${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;
  };

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur shadow-xl text-center">
      <h2 className="text-lg text-gray-400 mb-3">Timer</h2>

      <input
        type="number"
        value={input}
        onChange={handleInput}
        placeholder="Minutes"
        className="text-black p-2 rounded mb-3 w-24"
      />

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