import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { LLMService } from "./services/llmService";
import { DatabaseService } from "./services/databaseService";
import {
  CreateTaskPlanRequest,
  CreateTaskPlanResponse,
  APIResponse,
  Goal,
  Task,
} from "./types";
import { v4 as uuidv4 } from "uuid";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize services
const llmService = new LLMService();
const dbService = new DatabaseService();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (_, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Check LLM service availability
app.get("/api/llm/status", async (_, res) => {
  try {
    const isAvailable = await llmService.isServiceAvailable();
    res.json({
      success: true,
      data: { available: isAvailable },
    } as APIResponse<{ available: boolean }>);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to check LLM service status",
    } as APIResponse);
  }
});

// Create a new task plan from a goal
app.post("/api/plans", async (req, res) => {
  try {
    const { goalText, deadline, additionalContext }: CreateTaskPlanRequest =
      req.body;

    if (!goalText || goalText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: "Goal text is required",
      } as CreateTaskPlanResponse);
    }

    // Generate task plan using LLM
    const llmResponse = await llmService.generateTaskPlan(
      goalText,
      deadline,
      additionalContext
    );

    // Create goal in database
    const goal = await dbService.createGoal({
      title:
        goalText.length > 100 ? goalText.substring(0, 100) + "..." : goalText,
      description: goalText,
      deadline: deadline ? new Date(deadline) : undefined,
      status: "active",
    });

    // Create tasks in database
    const tasks: Task[] = [];
    const taskIdMap = new Map<string, string>(); // Map from task title to task ID

    // First pass: create all tasks
    for (const taskData of llmResponse.tasks) {
      const task = await dbService.createTask({
        goalId: goal.id,
        title: taskData.title,
        description: taskData.description,
        estimatedHours: taskData.estimatedHours,
        priority: taskData.priority,
        status: "pending",
      });

      tasks.push(task);
      taskIdMap.set(taskData.title, task.id);
    }

    // Second pass: create dependencies
    for (let i = 0; i < llmResponse.tasks.length; i++) {
      const taskData = llmResponse.tasks[i];
      const taskId = taskIdMap.get(taskData.title);

      if (taskId && taskData.dependencies.length > 0) {
        for (const depTitle of taskData.dependencies) {
          const depTaskId = taskIdMap.get(depTitle);
          if (depTaskId) {
            await dbService.createTaskDependency({
              taskId,
              dependsOnTaskId: depTaskId,
              dependencyType: "finish_to_start",
            });
          }
        }
      }
    }

    // Get the complete task plan
    const taskPlan = await dbService.getTaskPlan(goal.id);

    if (!taskPlan) {
      return res.status(500).json({
        success: false,
        error: "Failed to retrieve created task plan",
      } as CreateTaskPlanResponse);
    }

    // Update reasoning from LLM
    taskPlan.reasoning = llmResponse.reasoning;

    res.json({
      success: true,
      data: taskPlan,
    } as CreateTaskPlanResponse);
  } catch (error) {
    console.error("Error creating task plan:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create task plan",
    } as CreateTaskPlanResponse);
  }
});

// Get a specific task plan
app.get("/api/plans/:goalId", async (req, res) => {
  try {
    const { goalId } = req.params;

    const taskPlan = await dbService.getTaskPlan(goalId);

    if (!taskPlan) {
      return res.status(404).json({
        success: false,
        error: "Task plan not found",
      } as APIResponse);
    }

    res.json({
      success: true,
      data: taskPlan,
    } as APIResponse);
  } catch (error) {
    console.error("Error getting task plan:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get task plan",
    } as APIResponse);
  }
});

// Update task status
app.patch("/api/tasks/:taskId/status", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!["pending", "in_progress", "completed", "blocked"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status",
      } as APIResponse);
    }

    await dbService.updateTaskStatus(taskId, status);

    res.json({
      success: true,
      message: "Task status updated successfully",
    } as APIResponse);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update task status",
    } as APIResponse);
  }
});

// Get all goals (for listing purposes)
app.get("/api/goals", async (req, res) => {
  try {
    // This would require a method in DatabaseService to get all goals
    // For now, return empty array
    res.json({
      success: true,
      data: [],
    } as APIResponse<Goal[]>);
  } catch (error) {
    console.error("Error getting goals:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get goals",
    } as APIResponse);
  }
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    } as APIResponse);
  }
);

// Handle 404
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  } as APIResponse);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  await dbService.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully");
  await dbService.close();
  process.exit(0);
});

export default app;
