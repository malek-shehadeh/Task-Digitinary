import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTaskContext } from "../../hooks/useTaskContext";
import { FormField, Button } from "../../ui/index";

const TaskForm = () => {
  const { editingTask, addTask, updateTask, setEditingTask } = useTaskContext();
  const [task, setTask] = useState({
    name: "",
    dueDate: "",
    priority: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const validators = {
    name: (v) =>
      v && v.length < 3 ? "Name must be at least 3 characters" : "",
    dueDate: (v) =>
      new Date(v) < new Date().setHours(0, 0, 0, 0)
        ? "Due date cannot be in the past"
        : "",
    priority: (v) => (!v ? "Priority is required" : ""),
    description: (v) =>
      v.length > 200 ? "Description must be less than 200 characters" : "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(task);
    } else {
      addTask(task);
    }
    setTask({
      name: "",
      dueDate: "",
      priority: "",
      description: "",
    });
    setErrors({});
    setEditingTask(null);
  };

  const handleChange = ({ target: { name, value } }) => {
    setTask((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validators[name]?.(value) || "" }));
  };

  const isValid = () =>
    !Object.values(validators).some((validator) =>
      validator(
        task[Object.keys(validators).find((k) => validator === validators[k])]
      )
    );

  const handleCancel = () => {
    setEditingTask(null);
    setTask({
      name: "",
      dueDate: "",
      priority: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <div className="flex items-start gap-6 mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex-1 bg-white rounded-xl shadow-lg p-8">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editingTask ? "✏️ Edit Task" : "✨ Create New Task"}
          </h2>
          <p className="text-gray-500 mt-1">
            {editingTask
              ? "Update your task details below"
              : "Fill in the details for your new task"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Task Name"
            value={task.name}
            onChange={handleChange}
            name="name"
            error={errors.name}
            required
            className="bg-gray-50 focus:bg-white transition-colors"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Due Date"
              type="date"
              value={task.dueDate}
              onChange={handleChange}
              name="dueDate"
              error={errors.dueDate}
              required
              className="bg-gray-50 focus:bg-white transition-colors"
            />

            <FormField
              as="select"
              label="Priority"
              value={task.priority}
              onChange={handleChange}
              name="priority"
              error={errors.priority}
              required
              className="bg-gray-50 focus:bg-white transition-colors"
            >
              <option value="">Select Priority</option>
              {["low", "medium", "high"].map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </FormField>
          </div>

          <FormField
            as="textarea"
            label="Description"
            value={task.description}
            onChange={handleChange}
            name="description"
            error={errors.description}
            className="bg-gray-50 focus:bg-white transition-colors h-32"
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={!isValid()} className="px-6">
              {editingTask ? "Update Task" : "Create Task"}
            </Button>
            {editingTask && (
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Right side */}
      <div className="w-64 space-y-4 sticky top-24">
        <Link
          to="/favorites/redux"
          className="block p-4 bg-gradient-to-br from-green-500 to-blue-600 hover:from-blue-600 hover:to-green-700 text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
        >
          <h3 className="font-semibold text-lg mb-1">Redux Favorites</h3>
          <p className="text-sm opacity-90">View tasks saved with Redux</p>
        </Link>

        <Link
          to="/favorites/context"
          className="block p-4 bg-gradient-to-br from-green-500 to-purple-600 hover:from-purple-600 hover:to-green-700 text-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
        >
          <h3 className="font-semibold text-lg mb-1">Context Favorites</h3>
          <p className="text-sm opacity-90">View tasks saved with Context</p>
        </Link>
      </div>
    </div>
  );
};

export default TaskForm;
