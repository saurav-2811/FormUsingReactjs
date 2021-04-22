import {useState ,useEffect} from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import About from './Components/About'
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
    let res=await fetch('https://reacttasktracker2811.herokuapp.com/tasks/')
    let data= await res.json()
    return data.data
  }
  const fetchTask=async(id)=>{
    let res=await fetch(`https://reacttasktracker2811.herokuapp.com/tasks/${id}`)
    let data= await res.json()
    return data.data
  }
  const [showAddTask , setShowAddTask]=useState(false)
  const addTask=async(task)=>{
    const res=await fetch('https://reacttasktracker2811.herokuapp.com/tasks/',
    {
      method:'POST',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(task)
  }
    )
    const data=await res.json()
    setTasks([...tasks, data.data])
    // const id= Math.floor(Math.random()*10000)+1
    // const newTask={id , ...task}
    // setTasks([...tasks ,newTask])
  }


  const deleteTask= async(id)=>{
    await fetch(`https://reacttasktracker2811.herokuapp.com/tasks/${id}`,
    {
      method:'DELETE'
    })

   setTasks(tasks.filter((task)=>(
               task._id!==id
   )
    ))
  }


const toggleReminder=async(id)=>{
    const taskToggle=await fetchTask(id)
    const updTask={...taskToggle, reminder:!taskToggle.reminder}
     const res= await fetch(`https://reacttasktracker2811.herokuapp.com/tasks/${id}`,
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
   task._id===id?{ ...task ,reminder:data.reminder}:task
  )
  ))
}

  return (
    <Router>
    <div className="container">
    <Header onAdd={()=>setShowAddTask(!showAddTask)} showTask={showAddTask}/>
    <Route path='/' exact render ={(props)=>(
      <>
      {showAddTask?<AddTask onAdd={addTask}/>:''}
   {tasks.length>0? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>:"No Task available..."}
      </>
    )} />
    <Route path='/About' component={About}/>
    <Footer/>
    </div>
    </Router>
  );
}

export default App;
