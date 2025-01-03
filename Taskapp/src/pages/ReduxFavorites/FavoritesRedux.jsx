import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../../Reducers/favoriteSlice";
import { Button } from "../../ui/Button";
import { Trash2 } from "lucide-react";
import Alert from "../../ui/Alert";
const ReduxFavorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.tasks);

  const [deleteDialog, setDeleteDialog] = React.useState({
    isOpen: false,
    taskId: null,
  });

  React.useEffect(() => {
    console.log("Current favorites from Redux:", favorites);
  }, [favorites]);

  const handleDelete = (taskId) => setDeleteDialog({ isOpen: true, taskId });

  const handleConfirmDelete = () => {
    if (deleteDialog.taskId) {
      dispatch(removeFromFavorites(deleteDialog.taskId));
    }
    setDeleteDialog({ isOpen: false, taskId: null });
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold">No Favorites</h2>
        <p className="text-gray-600 mt-2">
          Add some tasks to your favorites to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        Favorites ({favorites.length})
      </h2>
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
          <div className="flex gap-2">
            <Button variant="danger" onClick={() => handleDelete(task.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
      <Alert
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, taskId: null })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ReduxFavorites;
