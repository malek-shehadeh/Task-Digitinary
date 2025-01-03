import { useTaskContext } from "../hooks/useTaskContext";

export const Toast = () => {
  const { toast } = useTaskContext();

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg max-w-md z-50 border
        ${
          toast.type === "success"
            ? "bg-green-100 text-green-800 border-green-200"
            : "bg-red-100 text-red-800 border-red-200"
        }`}
    >
      <p>{toast.message}</p>
    </div>
  );
};

export default Toast;
