import React, { useState } from "react";
import { useFavorites } from "../../Context/FavoritesContext";
import { Trash2 } from "lucide-react";
import { Button } from "../../ui/index";
import Alert from "../../ui/Alert";

const ContextFavorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      removeFromFavorites(taskToDelete);
      setTaskToDelete(null);
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold">No Context Favorites</h2>
        <p className="text-gray-600 mt-2">
          Add some tasks to your favorites to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Context Favorites</h2>
      {favorites.map((task) => (
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
          <Button variant="danger" onClick={() => handleDeleteClick(task.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <Alert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ContextFavorites;
