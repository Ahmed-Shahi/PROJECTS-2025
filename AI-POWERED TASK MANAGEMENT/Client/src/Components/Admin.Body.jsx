import React, { useEffect, useState } from "react";
import axios from 'axios'

function Admin_Body({ action }) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Medium",
    status: "To Do",
  });

  const [filter, setFilter] = useState({ status: "All", priority: "All" });
  
  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // Add task
  const handleAddTask = async (e) => {
    e.preventDefault();
    
    const url = location.pathname.toString().split('/')
    const index = url.length - 1
    const adminId = location.pathname.toString().split('/')[index]
    const assigneeId = action._id
    
    setFormData({
      title: "",
      description: "",
      deadline: "",
      priority: "Medium",
      status: "To Do",
    });
    const finalData = {
      ...formData,
      assignee: assigneeId,
      createdBy: adminId
    };
    
    console.log("finalData:", finalData);
    await axios.post(`http://localhost:8000/api/task/${adminId}`, { finalData }, {
      withCredentials: true
    })
    
    };

  const [allTask, setAllTask] = useState([]);
    
  useEffect(() => {
    const getData = async () => {
      const url = location.pathname.toString().split('/')
      const index = url.length - 1
      const adminId = location.pathname.toString().split('/')[index]
      console.log("adminId", adminId);
      
      const response = await axios.get(`http://localhost:8000/api/task/${adminId}`,{
        withCredentials: true
      })
      
      setAllTask(response.data)
      
    }
    getData()
  }, [location.pathname])
  
  console.log(allTask)

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h3 style={{ textTransform: "uppercase" }}>{action ? action.userName : 'Task Management'} <span style={{ fontSize: '10px' }}>{action ? action.role : ''}</span></h3>
      {action ?
        <form
          onSubmit={handleAddTask}
          className="bg-gray-100 p-4 rounded-lg mb-6 shadow"
        >
          <h2 className="text-lg font-semibold mb-2">Add Task</h2>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
        : ""}
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) =>
            setFilter({ ...filter, status: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="All">All Status</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <select
          onChange={(e) =>
            setFilter({ ...filter, priority: e.target.value })
          }
          className="border p-2 rounded"
        >
          <option value="All">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {/* Task List */}
      <div>      
          <h1>task</h1>
        <ul>
        {allTask.map((value,index)=>{
            return <li key={index}>
              <span>{value.title}</span> 
              <span>{value.description}</span> 
              </li>
        })} 
        </ul>
      </div>
    </div>
  );
}

export default Admin_Body;
