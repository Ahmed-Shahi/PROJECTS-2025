import React, { useState } from "react";
function TaskManager() {
  const [tasks, setTasks] = useState([]);
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
  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...formData, id: Date.now() }]);
    console.log(tasks);
    
    setFormData({
      title: "",
      description: "",
      deadline: "",
      priority: "Medium",
      status: "To Do",
    });
  };

  // Update task status
  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status } : task)));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Apply filters
  const filteredTasks = tasks.filter((task) => {
    return (
      (filter.status === "All" || task.status === filter.status) &&
      (filter.priority === "All" || task.priority === filter.priority)
    );
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {/* Task Form */}
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
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow p-4 rounded flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-sm">
                <strong>Deadline:</strong> {task.deadline || "No deadline"}
              </p>
              <p className="text-sm">
                <strong>Priority:</strong> {task.priority}
              </p>
              <p className="text-sm">
                <strong>Status:</strong> {task.status}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <select
                value={task.status}
                onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                className="border p-1 rounded"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
}

export default TaskManager;
