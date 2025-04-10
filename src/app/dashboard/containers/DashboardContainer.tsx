import React from "react";
import { useQuery, useMutation } from "react-query";
import { getTasks, addTask, updateTask } from "@/lib/api/tasks";
import Dashboard from "../components/Dashboard";

const DashboardContainer: React.FC = () => {
  const { data: tasks, isLoading, error } = useQuery("tasks", getTasks);
  const addTaskMutation = useMutation(addTask);

  if (isLoading) return <div>Loading...</div>;

  if (tasks instanceof Error) {
    console.error("Error fetching tasks:", tasks.message);
    return <div>Error: {tasks.message}</div>;
  }

  return (
    <Dashboard
      tasks={
        tasks
          ? tasks.map((task) => ({
              ...task,
              id: task.id.toString(),
            }))
          : []
      }
      addTaskMutation={addTaskMutation}
    />
  );
};

export default DashboardContainer;
