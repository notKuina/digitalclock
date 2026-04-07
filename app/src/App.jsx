import './App.css'
import Alarm from './components/Alarm'
import Clock from './components/Clock'
import Stopwatch from './components/Stopwatch'
import Timer from './components/Timer'

function App() {

  return (
    <div className="min-h-screen  p-6 grid md:grid-cols-2 gap-6 relative ">
      <Clock />
      <Alarm />
      <Stopwatch />
      <Timer />
    </div>
  )
}

export default App
