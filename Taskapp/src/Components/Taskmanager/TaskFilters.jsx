import React from "react";
import { useTaskContext } from "../../hooks/useTaskContext";
import { FormField } from "../../ui/index";

const TaskFilters = () => {
  const { setFilters, setSortBy } = useTaskContext();

  return (
    <div className="mb-6 flex gap-4">
      <FormField
        as="select"
        label="Filter by Priority"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, priority: e.target.value }))
        }
      >
        <option value="">All</option>
        {["low", "medium", "high"].map((p) => (
          <option key={p} value={p}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </option>
        ))}
      </FormField>

      <FormField
        as="select"
        label="Filter by Due Date"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, dueDate: e.target.value }))
        }
      >
        <option value="">All</option>
        <option value="overdue">Overdue</option>
        <option value="week">Next 7 Days</option>
      </FormField>

      <FormField
        as="select"
        label="Sort by"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="dueDate-asc">Due Date (Ascending)</option>
        <option value="dueDate-desc">Due Date (Descending)</option>
        <option value="priority-asc">Priority (Low to High)</option>
        <option value="priority-desc">Priority (High to Low)</option>
      </FormField>
    </div>
  );
};

export default TaskFilters;
