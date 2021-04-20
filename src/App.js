import {useState ,useEffect} from 'react'
import Header from './Components/Header'
import AddTask from './Components/AddTask'
import Tasks from './Components/Tasks'
function App() {
  const[tasks,setTasks]=useState([])  
  useEffect(()=>{
    const getData=async()=>{
      const taskFromServer= await fetchApi()
      setTasks(taskFromServer)
    }
    getData()
  },[])
  const fetchApi=async()=>{
    let res=await fetch('http://localhost:5000/tasks')
    let data= await res.json()
    return data
  }
  const fetchTask=async(id)=>{
    let res=await fetch(`http://localhost:5000/tasks/${id}`)
    let data= await res.json()
    return data
  }
  const [showAddTask , setShowAddTask]=useState(false)
  const addTask=async(task)=>{
    const res=await fetch('http://localhost:5000/tasks',
    {
      method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  }
    )
    const data=await res.json()
    setTasks([...tasks, data])
    // const id= Math.floor(Math.random()*10000)+1
    // const newTask={id , ...task}
    // setTasks([...tasks ,newTask])
  }


  const deleteTask= async(id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method:'DELETE'
    })

   setTasks(tasks.filter((task)=>(
               task.id!==id
   )
    ))
  }

const toggleReminder=async(id)=>{
    const taskToggle=await fetchTask(id)
    const updTask={...taskToggle, reminder:!taskToggle.reminder}
    const res= await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(updTask)
  }
    )
    const data=await res.json()

 setTasks(tasks.map((task)=>(
   task.id===id?{ ...task ,reminder:!task.reminder}:task
  )
  ))
}

  return (
    <div className="container">
    <Header onAdd={()=>setShowAddTask(!showAddTask)} showTask={showAddTask}/>
    {showAddTask?<AddTask onAdd={addTask}/>:''}
   {tasks.length>0? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:"No Task available..."}
    </div>
  );
}

export default App;
