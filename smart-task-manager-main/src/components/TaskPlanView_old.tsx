"use client";

import { TaskPlan } from "@/types";
import TaskCard from "./TaskCard";

interface TaskPlanViewProps {
  plan: TaskPlan;
  onTaskStatusChange: (
    taskId: string,
    newStatus: "pending" | "in_progress" | "completed" | "blocked"
  ) => void;
}

export default function TaskPlanView({
  plan,
  onTaskStatusChange,
}: TaskPlanViewProps) {
  const completedTasks = plan.tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const totalTasks = plan.tasks.length;
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const groupedTasks = {
    pending: plan.tasks.filter((task) => task.status === "pending"),
    in_progress: plan.tasks.filter((task) => task.status === "in_progress"),
    completed: plan.tasks.filter((task) => task.status === "completed"),
    blocked: plan.tasks.filter((task) => task.status === "blocked"),
  };

  const statusLabels = {
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
    blocked: "Blocked",
  };

  return (
    <div className="space-y-8">
      {/* Goal Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {plan.goal.title}
            </h2>
            <p className="text-gray-600 mt-1">
              Smart task breakdown with AI-powered planning
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Tasks */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold text-blue-600">{totalTasks}</h3>
                <p className="text-blue-700 font-medium">Total Tasks</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-6 border border-emerald-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold text-emerald-600">{completedTasks}</h3>
                <p className="text-emerald-700 font-medium">Completed</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 border border-amber-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold text-amber-600">{groupedTasks.in_progress.length}</h3>
                <p className="text-amber-700 font-medium">In Progress</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold text-purple-600">{Math.round(progressPercentage)}%</h3>
                <p className="text-purple-700 font-medium">Progress</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Task Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plan.tasks.map((task) => {
          const statusConfigMap = {
            pending: {
              title: "📝 To Do",
              color: "from-slate-500 to-slate-600",
              bg: "from-slate-50/80 to-slate-100/80",
              border: "border-slate-200/50",
              shadow: "shadow-slate-200/50",
              icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
              count: groupedTasks.pending.length,
            },
            in_progress: {
              title: "⚡ In Progress",
              color: "from-blue-500 to-blue-600",
              bg: "from-blue-50/80 to-blue-100/80",
              border: "border-blue-200/50",
              shadow: "shadow-blue-200/50",
              icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
              count: groupedTasks.in_progress.length,
            },
            completed: {
              title: "✅ Completed",
              color: "from-emerald-500 to-emerald-600",
              bg: "from-emerald-50/80 to-emerald-100/80",
              border: "border-emerald-200/50",
              shadow: "shadow-emerald-200/50",
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              count: groupedTasks.completed.length,
            },
            blocked: {
              title: "🚫 Blocked",
              color: "from-red-500 to-red-600",
              bg: "from-red-50/80 to-red-100/80",
              border: "border-red-200/50",
              shadow: "shadow-red-200/50",
              icon: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728",
              count: groupedTasks.blocked.length,
            },
          };

          const config = statusConfigMap[task.status];

          return (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onTaskStatusChange}
            />
          );
        })}
      </div>
    </div>
  );
}
