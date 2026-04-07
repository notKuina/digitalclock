// components/Alarm.jsx
import { useEffect, useState, useRef } from "react";

export default function Alarm() {
  const [alarms, setAlarms] = useState([]);
  const [time, setTime] = useState("");
  const audio = useRef(new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3")).current;

  useEffect(()=>{
    const saved = localStorage.getItem("alarms");
    if(saved) setAlarms(JSON.parse(saved));
  },[]);

  useEffect(()=>{
    localStorage.setItem("alarms", JSON.stringify(alarms));
  },[alarms]);

  useEffect(()=>{
    const i = setInterval(()=>{
      const now = new Date().toTimeString().slice(0,5);
      setAlarms(prev=>prev.map(a=>{
        if(a.time===now && a.active && !a.ringing){
          audio.loop=true;
          audio.play();
          return {...a, ringing:true};
        }
        return a;
      }));
    },1000);
    return ()=>clearInterval(i);
  },[]);

  const add = ()=>{
    setAlarms([...alarms,{id:Date.now(),time,active:true,ringing:false}]);
    setTime("");
  };

  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur shadow-xl text-center ">
      <h2>Alarms</h2>

      <input type="time" value={time} onChange={e=>setTime(e.target.value)} className=" border border-2 rounded-2xl"/>
      <button onClick={add} className="border border-2 rounded-2xl w-20 m-4">Add</button>

      {alarms.map(a=>(
        <div key={a.id}>
          {a.time}
          <button onClick={()=>setAlarms(alarms.filter(x=>x.id!==a.id))}>X</button>
        </div>
      ))}
    </div>
  );
}