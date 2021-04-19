import {useState} from 'react'
import Header from './Components/Header'
import Tasks from './Components/Tasks'
function App() {
  const[tasks,setTasks]=useState([
    {
    id:1,
    text: "Doctors Appointment",
    day: "Feb 5th at 2:30pm",
    reminder: true   
},
{
    id:2,
    text: "Doctor Appointment",
    day: "Feb 5th at 2:30pm",
    reminder: false  
},
{
    id:3,
    text: "Doct Appointment",
    day: "Feb 5th at 2:30pm",
    reminder: true   
}
])

  const deleteTask= (id)=>{
   setTasks(tasks.filter((task)=>(
               task.id!==id
   )
    ))
  }

const toggleReminder=(id)=>{
 setTasks(tasks.map((task)=>(
   task.id===id?{ ...task ,reminder:!task.reminder}:task
  )
  ))
}

  return (
    <div className="container">
    <Header/>
    <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
    </div>
  );
}

export default App;
