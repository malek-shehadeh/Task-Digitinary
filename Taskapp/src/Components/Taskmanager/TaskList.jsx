import React, { useState, useEffect } from "react";
import { useTaskContext } from "../../hooks/useTaskContext";
import { Button } from "../../ui/index";
import { Edit2, Trash2, Heart } from "lucide-react";
import Alert from "../../ui/Alert";
import { useFavoritesAction } from "../../hooks/useFavoritesAction";
import { useFavorites } from "../../Context/FavoritesContext";
import { useSelector } from "react-redux";

const TaskList = () => {
  const { tasks, setEditingTask, deleteTask } = useTaskContext();
  const { addToReduxFavorites } = useFavoritesAction();
  const { addToFavorites, favorites: contextFavorites } = useFavorites();
  const reduxFavorites = useSelector((state) => state.favorites.tasks);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    taskId: null,
  });

  useEffect(() => {
    console.log("Current Redux Favorites:", reduxFavorites);
  }, [reduxFavorites]);

  const handleAddToReduxFavorites = (task) => {
    console.log("Adding task to favorites:", task);
    addToReduxFavorites(task);
  };

  const handleDelete = (taskId) => {
    setDeleteDialog({ isOpen: true, taskId });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.taskId) {
      deleteTask(deleteDialog.taskId);
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setDeleteDialog({ isOpen: false, taskId: null });
  };

  const isTaskInReduxFavorites = (taskId) => {
    return reduxFavorites?.some((fav) => fav.id === taskId) || false;
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const isReduxFavorite = isTaskInReduxFavorites(task.id);
        const isContextFavorite = contextFavorites.some(
          (fav) => fav.id === task.id
        );

        return (
          <div
            key={task.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{task.name}</h3>
              <p className="text-sm text-gray-600">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">Priority: {task.priority}</p>
              {task.description && (
                <p className="text-sm mt-2">{task.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditingTask(task)}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button variant="danger" onClick={() => handleDelete(task.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAddToReduxFavorites(task)}
                className={`bg-red-50 hover:bg-red-100 ${
                  isReduxFavorite ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isReduxFavorite}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    isReduxFavorite ? "fill-current" : ""
                  }`}
                />
                {isReduxFavorite ? "Added to Redux" : "Add to Redux"}
              </Button>
              <Button
                variant="outline"
                onClick={() => addToFavorites(task)}
                className={`bg-blue-50 hover:bg-blue-100 ${
                  isContextFavorite ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isContextFavorite}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${
                    isContextFavorite ? "fill-current" : ""
                  }`}
                />
                {isContextFavorite ? "Added to Context" : "Add to Context"}
              </Button>
            </div>
          </div>
        );
      })}
      <Alert
        isOpen={deleteDialog.isOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default TaskList;
