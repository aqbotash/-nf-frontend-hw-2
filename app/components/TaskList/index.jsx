// components/TaskList.js
import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({ tasks, filter, onToggle, onDelete }) => {
  return (
    <ul>
      {tasks
        .filter(task => {
          if (filter === 'All') {
            return true;
          } else if (filter === 'Incomplete') {
            return !task.completed;
          } else if (filter === 'Completed') {
            return task.completed;
          }
          return true;
        })
        .map(task => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
    </ul>
  );
};

export default TaskList;
