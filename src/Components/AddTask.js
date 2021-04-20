import {useState} from 'react'

const AddTask=({onAdd})=>{
    const [text, setText]=useState('')
    const [day, setDay]=useState('')
    const [reminder, setReminder]=useState(false)
    const onSubmit=(e)=>{
        e.preventDefault()
        
        if(!text||!day){
            alert('Please add a task and date!')
            return
        }
        
        onAdd({text,day,reminder})
        setText('')
        setDay('')
        setReminder(false)
    }
    return(
        <form className="add-form" onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e)=>setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Date/Time</label>
                <input type='text' placeholder='Add Date/Time' value={day} onChange={(e)=>setDay(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Reminder</label>
                <input type='checkbox' value={reminder} checked={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)}/>
            </div>
            <div className='form-control '>
                <input className='btn btn-block' type='submit' value='Save'/>
            </div>
        </form>
    )
}
export default AddTask;