import { useState, useContext } from "react";
import TaskContext from "../Context/TaskContext";
import { FavoritesContext } from "../Context/FavoritesContext";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ priority: "", dueDate: "" });
  const [sortBy, setSortBy] = useState("dueDate-asc");
  const [toast, setToast] = useState(null);

  const favoritesContext = useContext(FavoritesContext);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToContextFavorites = (task) => {
    if (favoritesContext?.addToFavorites) {
      favoritesContext.addToFavorites(task);
      showToast("Task added to favorites!");
    }
  };

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    showToast("Task added successfully!");
  };

  const updateTask = (task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    showToast("Task updated successfully!");
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    showToast("Task deleted successfully!");
  };

  const filterAndSortTasks = () => {
    let filtered = tasks.filter((task) => {
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.dueDate) {
        const today = new Date().setHours(0, 0, 0, 0);
        const dueDate = new Date(task.dueDate).getTime();
        const isOverdue = filters.dueDate === "overdue" && dueDate < today;
        const isWeek =
          filters.dueDate === "week" &&
          dueDate >= today &&
          dueDate <= today + 7 * 24 * 60 * 60 * 1000;
        return filters.dueDate === "overdue" ? isOverdue : isWeek;
      }
      return true;
    });

    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;

    return filtered.sort((a, b) =>
      field === "dueDate"
        ? modifier * (new Date(a.dueDate) - new Date(b.dueDate))
        : modifier * (a[field] > b[field] ? 1 : -1)
    );
  };

  const contextValue = {
    tasks: filterAndSortTasks(),
    editingTask,
    filters,
    sortBy,
    toast,
    addTask,
    updateTask,
    deleteTask,
    setEditingTask,
    setFilters,
    setSortBy,
    addToContextFavorites,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
