import React from 'react'
import { useEffect, useState} from "react";
import NepaliDate from "nepali-date-converter";

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(()=>{
        const i = setInterval(()=>setTime(new Date()), 1000);
        return () =>clearInterval(i);
    },[]);

    const np = new NepaliDate();
    const h = time.getHours();
    const m= time.getMinutes();
    const s= time.getSeconds();

  return (
    <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur shadow-xl text-center">
      <h2 className="black">Clock</h2>

      <div className="text-3xl mt-2 text-blue-600">
        {time.toLocaleTimeString()}
      </div>

      <div className="text-sm text-gray-400">
        UTC: {time.toUTCString()}
      </div>

      <div className="text-red-400">
        BS: {np.format("YYYY-MM-DD")}
      </div>
    </div>
  )
}

export default Clock
