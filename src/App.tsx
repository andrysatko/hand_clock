import './App.css'
import Clock from './components/Clock'
import TimeForm from './components/TimerForm'
import { useState } from "react";

export type ClockState = {
  hours: number;
  minutes: number;
};
function App() {
  const [time, setTime] = useState<ClockState>({ hours: 0, minutes: 0 });

  return (
    <>
    <TimeForm setTime={setTime}></TimeForm>
    <Clock hours={time.hours} minutes={time.minutes}></Clock>
    </>
  )
}

export default App
