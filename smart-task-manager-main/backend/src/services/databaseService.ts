import sqlite3 from "sqlite3";
import { promisify } from "util";
import { Goal, Task, TaskDependency, TaskPlan } from "../types";
import { v4 as uuidv4 } from "uuid";

interface GoalRow {
  id: string;
  title: string;
  description: string;
  deadline: string | null;
  created_at: string;
  updated_at: string;
  status: string;
}

interface TaskRow {
  id: string;
  goal_id: string;
  title: string;
  description: string;
  estimated_hours: number;
  priority: string;
  status: string;
  start_date: string | null;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

interface TaskDependencyRow {
  id: string;
  task_id: string;
  depends_on_task_id: string;
  dependency_type: string;
  created_at: string;
}

export class DatabaseService {
  private db: sqlite3.Database;

  constructor(dbPath: string = "./database.db") {
    this.db = new sqlite3.Database(dbPath);
    this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    const run = promisify(this.db.run.bind(this.db));

    try {
      // Create goals table
      await run(`
        CREATE TABLE IF NOT EXISTS goals (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          deadline DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused'))
        )
      `);

      // Create tasks table
      await run(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY,
          goal_id TEXT NOT NULL,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          estimated_hours INTEGER NOT NULL,
          priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')),
          start_date DATETIME,
          due_date DATETIME,
          completed_at DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (goal_id) REFERENCES goals (id) ON DELETE CASCADE
        )
      `);

      // Create task_dependencies table
      await run(`
        CREATE TABLE IF NOT EXISTS task_dependencies (
          id TEXT PRIMARY KEY,
          task_id TEXT NOT NULL,
          depends_on_task_id TEXT NOT NULL,
          dependency_type TEXT DEFAULT 'finish_to_start' CHECK (dependency_type IN ('finish_to_start', 'start_to_start', 'finish_to_finish', 'start_to_finish')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (task_id) REFERENCES tasks (id) ON DELETE CASCADE,
          FOREIGN KEY (depends_on_task_id) REFERENCES tasks (id) ON DELETE CASCADE
        )
      `);

      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Error initializing database:", error);
      throw error;
    }
  }

  async createGoal(
    goalData: Omit<Goal, "id" | "createdAt" | "updatedAt">
  ): Promise<Goal> {
    const run = promisify(this.db.run.bind(this.db)) as (
      sql: string,
      params?: unknown[]
    ) => Promise<sqlite3.RunResult>;
    const id = uuidv4();
    const now = new Date().toISOString();

    try {
      await run(
        `INSERT INTO goals (id, title, description, deadline, created_at, updated_at, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          goalData.title,
          goalData.description,
          goalData.deadline?.toISOString(),
          now,
          now,
          goalData.status,
        ]
      );

      return {
        id,
        ...goalData,
        createdAt: new Date(now),
        updatedAt: new Date(now),
      };
    } catch (error) {
      console.error("Error creating goal:", error);
      throw error;
    }
  }

  async createTask(
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "dependencies">
  ): Promise<Task> {
    const run = promisify(this.db.run.bind(this.db)) as (
      sql: string,
      params?: unknown[]
    ) => Promise<sqlite3.RunResult>;
    const id = uuidv4();
    const now = new Date().toISOString();

    try {
      await run(
        `INSERT INTO tasks (id, goal_id, title, description, estimated_hours, priority, status, start_date, due_date, completed_at, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          taskData.goalId,
          taskData.title,
          taskData.description,
          taskData.estimatedHours,
          taskData.priority,
          taskData.status,
          taskData.startDate?.toISOString(),
          taskData.dueDate?.toISOString(),
          taskData.completedAt?.toISOString(),
          now,
          now,
        ]
      );

      const dependencies = await this.getTaskDependencies(id);
      return {
        id,
        ...taskData,
        dependencies: dependencies.map((dep) => dep.dependsOnTaskId),
        createdAt: new Date(now),
        updatedAt: new Date(now),
      };
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  async createTaskDependency(
    dependencyData: Omit<TaskDependency, "id" | "createdAt">
  ): Promise<TaskDependency> {
    const run = promisify(this.db.run.bind(this.db)) as (
      sql: string,
      params?: unknown[]
    ) => Promise<sqlite3.RunResult>;
    const id = uuidv4();
    const now = new Date().toISOString();

    try {
      await run(
        `INSERT INTO task_dependencies (id, task_id, depends_on_task_id, dependency_type, created_at) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          id,
          dependencyData.taskId,
          dependencyData.dependsOnTaskId,
          dependencyData.dependencyType,
          now,
        ]
      );

      return {
        id,
        ...dependencyData,
        createdAt: new Date(now),
      };
    } catch (error) {
      console.error("Error creating task dependency:", error);
      throw error;
    }
  }

  async getGoalById(id: string): Promise<Goal | null> {
    const get = promisify(this.db.get.bind(this.db)) as (
      sql: string,
      params: unknown[]
    ) => Promise<GoalRow | undefined>;

    try {
      const row = await get("SELECT * FROM goals WHERE id = ?", [id]);
      if (!row) return null;

      return {
        id: row.id,
        title: row.title,
        description: row.description,
        deadline: row.deadline ? new Date(row.deadline) : undefined,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        status: row.status as Goal["status"],
      };
    } catch (error) {
      console.error("Error getting goal:", error);
      throw error;
    }
  }

  async getTasksByGoalId(goalId: string): Promise<Task[]> {
    const all = promisify(this.db.all.bind(this.db)) as (
      sql: string,
      params: unknown[]
    ) => Promise<TaskRow[]>;

    try {
      const rows = await all(
        "SELECT * FROM tasks WHERE goal_id = ? ORDER BY created_at",
        [goalId]
      );

      const tasks = await Promise.all(
        rows.map(async (row) => {
          const dependencies = await this.getTaskDependencies(row.id);
          return {
            id: row.id,
            goalId: row.goal_id,
            title: row.title,
            description: row.description,
            estimatedHours: row.estimated_hours,
            priority: row.priority as Task["priority"],
            status: row.status as Task["status"],
            startDate: row.start_date ? new Date(row.start_date) : undefined,
            dueDate: row.due_date ? new Date(row.due_date) : undefined,
            completedAt: row.completed_at
              ? new Date(row.completed_at)
              : undefined,
            dependencies: dependencies.map((dep) => dep.dependsOnTaskId),
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
          };
        })
      );

      return tasks;
    } catch (error) {
      console.error("Error getting tasks:", error);
      throw error;
    }
  }

  async getTaskDependencies(taskId: string): Promise<TaskDependency[]> {
    const all = promisify(this.db.all.bind(this.db)) as (
      sql: string,
      params: unknown[]
    ) => Promise<TaskDependencyRow[]>;

    try {
      const rows = await all(
        "SELECT * FROM task_dependencies WHERE task_id = ?",
        [taskId]
      );

      return rows.map((row) => ({
        id: row.id,
        taskId: row.task_id,
        dependsOnTaskId: row.depends_on_task_id,
        dependencyType: row.dependency_type as TaskDependency["dependencyType"],
        createdAt: new Date(row.created_at),
      }));
    } catch (error) {
      console.error("Error getting task dependencies:", error);
      throw error;
    }
  }

  async getTaskPlan(goalId: string): Promise<TaskPlan | null> {
    try {
      const goal = await this.getGoalById(goalId);
      if (!goal) return null;

      const tasks = await this.getTasksByGoalId(goalId);
      const allDependencies: TaskDependency[] = [];

      for (const task of tasks) {
        const dependencies = await this.getTaskDependencies(task.id);
        allDependencies.push(...dependencies);
      }

      const estimatedDuration = Math.ceil(
        tasks.reduce((total, task) => total + task.estimatedHours, 0) / 8
      );
      const criticalPath = this.calculateCriticalPath(tasks, allDependencies);

      return {
        goal,
        tasks,
        dependencies: allDependencies,
        estimatedDuration,
        criticalPath,
        reasoning: "Task plan retrieved from database",
      };
    } catch (error) {
      console.error("Error getting task plan:", error);
      throw error;
    }
  }

  private calculateCriticalPath(
    tasks: Task[],
    dependencies: TaskDependency[]
  ): string[] {
    // Simple critical path calculation - return tasks in dependency order
    const visited = new Set<string>();
    const criticalPath: string[] = [];

    const visit = (taskId: string) => {
      if (visited.has(taskId)) return;
      visited.add(taskId);

      const deps = dependencies.filter((dep) => dep.taskId === taskId);
      deps.forEach((dep) => visit(dep.dependsOnTaskId));

      criticalPath.push(taskId);
    };

    tasks.forEach((task) => visit(task.id));
    return criticalPath;
  }

  async updateTaskStatus(
    taskId: string,
    status: Task["status"]
  ): Promise<void> {
    const run = promisify(this.db.run.bind(this.db)) as (
      sql: string,
      params?: unknown[]
    ) => Promise<sqlite3.RunResult>;
    const now = new Date().toISOString();
    const completedAt = status === "completed" ? now : null;

    try {
      await run(
        "UPDATE tasks SET status = ?, completed_at = ?, updated_at = ? WHERE id = ?",
        [status, completedAt, now, taskId]
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      throw error;
    }
  }

  async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
