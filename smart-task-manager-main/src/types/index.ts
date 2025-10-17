// Re-export backend types for frontend use
export * from "../../backend/src/types";

// Additional frontend-specific types
export interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onEdit: (task: Task) => void;
}

export interface GoalFormData {
  title: string;
  description: string;
  deadline?: string;
}

export interface TaskPlannerState {
  currentGoal: Goal | null;
  currentPlan: TaskPlan | null;
  isLoading: boolean;
  error: string | null;
}

export interface TimelineEvent {
  id: string;
  taskId: string;
  title: string;
  start: Date;
  end: Date;
  type: "task" | "milestone" | "dependency";
  status: Task["status"];
}

// Import types for reference in this file
import { Goal, Task, TaskPlan } from "../../backend/src/types";
