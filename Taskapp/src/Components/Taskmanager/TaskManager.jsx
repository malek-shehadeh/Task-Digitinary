import React from "react";
import TaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import TaskFilters from "./TaskFilters";
import { Toast } from "../../ui/index";

const TaskManager = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
      <TaskForm />
      <TaskFilters />
      <TaskList />
      <Toast />
    </div>
  );
};
export default TaskManager;
