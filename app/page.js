'use client'
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

export default function Home() {
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do?"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        <TaskList tasks={tasks} filter={filter} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>{tasks.filter(task => !task.completed).length} items left</span>
          <div>
            <button onClick={() => handleFilterChange('All')} className={`mr-2 ${filter === 'All' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => handleFilterChange('Incomplete')} className={`mr-2 ${filter === 'Incomplete' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => handleFilterChange('Completed')} className={`${filter === 'Completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
              onClick={handleClearCompleted}
              className="text-gray-400 hover:text-white"
            >
              Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
