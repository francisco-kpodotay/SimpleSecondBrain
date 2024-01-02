import { useState } from "react"

export function HabitTracker(){
  const date = new Date;
  const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const [view, setView] = useState("Month")

  return (
    <div>

  <div>Habit Tracker</div>
  <div>View: {view}</div>
  <div>{monthList[date.getMonth()] } { date.getFullYear()}</div>
  <div>Habit Tra</div>
    
    
    </div>
  )
}