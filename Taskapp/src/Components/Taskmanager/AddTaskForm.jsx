import React, { useState, useEffect } from "react";
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
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <FormField
        label="Task Name"
        value={task.name}
        onChange={handleChange}
        name="name"
        error={errors.name}
        required
      />
      <FormField
        label="Due Date"
        type="date"
        value={task.dueDate}
        onChange={handleChange}
        name="dueDate"
        error={errors.dueDate}
        required
      />
      <FormField
        as="select"
        label="Priority"
        value={task.priority}
        onChange={handleChange}
        name="priority"
        error={errors.priority}
        required
      >
        <option value="">Select Priority</option>
        {["low", "medium", "high"].map((p) => (
          <option key={p} value={p}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </option>
        ))}
      </FormField>
      <FormField
        as="textarea"
        label="Description"
        value={task.description}
        onChange={handleChange}
        name="description"
        error={errors.description}
      />
      <div className="flex gap-2">
        <Button type="submit" disabled={!isValid()}>
          {editingTask ? "Update" : "Add"} Task
        </Button>
        {editingTask && (
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
