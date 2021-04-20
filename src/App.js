import {useState} from 'react'
import Header from './Components/Header'
import AddTask from './Components/AddTask'
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

  const addTask=(task)=>{
    const id= Math.floor(Math.random()*10000)+1
    const newTask={id , ...task}
    setTasks([...tasks ,newTask])
  }


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
    <AddTask onAdd={addTask}/>
   {tasks.length>0? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:"No Task available..."}
    </div>
  );
}

export default App;
