import React, {useState , useEffect} from "react"
import './App.css';
import Axios from 'axios'

function App() {
  const [taskName, setTaskName] = useState('')
  const [taskType, setTaskType] = useState('')
  const [taskList , setTaskList] = useState([])
  const [updateList , setUpdateList] = useState('')

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getDetails").then((response)=>{
      setTaskList(response.data)
  })
  },[])

  const submitTask = () => {
    Axios.post("http://localhost:3001/api/insert", {taskName : taskName, taskType: taskType})

    setTaskList([...taskList,{taskName:taskName,taskType:taskType}])
  }

  const deleteTask = (task) => {
    Axios.delete(`http://localhost:3001/api/delete/${task}`)
    window.location.reload();
  }

  const updateTask = (taskName) => {
    Axios.put("http://localhost:3001/api/update/",{taskName : taskName, taskType: updateList})
    setUpdateList("")
    window.location.reload();
  }


  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label>Task name</label>
        <input type="text" name="taskName" onChange = {(e) => {
          setTaskName(e.target.value)
        }}/>
        <label>Task type</label>
        <input type="text" name="taskType" onChange = {(e) => {
          setTaskType(e.target.value)
        }}/>
        <button onClick={submitTask}>Submit</button>
      </div>

      {taskList.map((val)=>{
        return (
          <div className="card">
          <h1>{val.taskName}</h1>
          <p>{val.taskType}</p>

          <label>Task Type</label>
          <input type="text" id="update" name="taskType" onChange ={(e)=>{
              setUpdateList(e.target.value)
          }}/>
          <button onClick={() => {updateTask(val.taskName)}}>Update</button>
          <br></br>
          
          <button onClick={() => {deleteTask(val.taskName)}}>Delete</button>

          </div>
        )
      })}
    </div>
  );
}

export default App;
