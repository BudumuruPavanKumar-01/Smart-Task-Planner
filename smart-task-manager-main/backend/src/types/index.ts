export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
  status: "active" | "completed" | "paused";
}

export interface Task {
  id: string;
  goalId: string;
  title: string;
  description: string;
  estimatedHours: number;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "completed" | "blocked";
  startDate?: Date;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  dependencies: string[]; // Array of task IDs that must be completed first
}

export interface TaskDependency {
  id: string;
  taskId: string;
  dependsOnTaskId: string;
  dependencyType:
    | "finish_to_start"
    | "start_to_start"
    | "finish_to_finish"
    | "start_to_finish";
  createdAt: Date;
}

export interface TaskPlan {
  goal: Goal;
  tasks: Task[];
  dependencies: TaskDependency[];
  estimatedDuration: number; // in days
  criticalPath: string[]; // Array of task IDs forming the critical path
  reasoning: string; // LLM's reasoning for the task breakdown
}

export interface CreateGoalRequest {
  title: string;
  description: string;
  deadline?: string; // ISO date string
}

export interface CreateTaskPlanRequest {
  goalText: string;
  deadline?: string; // ISO date string
  additionalContext?: string;
}

export interface CreateTaskPlanResponse {
  success: boolean;
  data?: TaskPlan;
  error?: string;
}

export interface LLMResponse {
  tasks: {
    title: string;
    description: string;
    estimatedHours: number;
    priority: "low" | "medium" | "high" | "urgent";
    dependencies: string[]; // Array of task titles that this task depends on
  }[];
  reasoning: string;
  estimatedDuration: number;
  criticalPath: string[];
}

export interface DatabaseConfig {
  path: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
