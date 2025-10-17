"use client";

import { useState } from "react";
import { TaskPlan, Task } from "@/types";

interface TaskPlanViewProps {
  plan: TaskPlan;
  onTaskStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}

const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  blocked: "Blocked",
};

export default function TaskPlanView({
  plan,
  onTaskStatusChange,
}: TaskPlanViewProps) {
  const [activeTab, setActiveTab] = useState<"all" | Task["status"]>("all");

  const groupedTasks = plan.tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<Task["status"], Task[]>);

  // Filter tasks based on active tab
  const filteredTasks =
    activeTab === "all"
      ? plan.tasks
      : plan.tasks.filter((task) => task.status === activeTab);

  const completedTasks = plan.tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const totalTasks = plan.tasks.length;
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const totalEstimatedHours = plan.tasks.reduce(
    (sum, task) => sum + task.estimatedHours,
    0
  );

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
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {plan.goal.title}
            </h2>
            <p className="text-gray-600 mt-1">{plan.goal.description}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Overall Progress
            </span>
            <span className="text-sm font-bold text-blue-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Tasks</p>
                <p className="text-xl font-bold text-gray-800">{totalTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Estimated Duration
                </p>
                <p className="text-xl font-bold text-gray-800">
                  {totalEstimatedHours}h
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
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
              <div>
                <p className="text-sm text-gray-600 font-medium">Completed</p>
                <p className="text-xl font-bold text-gray-800">
                  {completedTasks}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Hours</p>
                <p className="text-xl font-bold text-gray-800">
                  {totalEstimatedHours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Reasoning */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-xl border border-indigo-100/50 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Analysis & Strategic Reasoning
          </h3>
        </div>
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
          <p className="text-gray-700 leading-relaxed text-lg">
            {plan.reasoning}
          </p>
        </div>
      </div>

      {/* Beautiful Task Gallery */}
      <div className="space-y-8">
        {/* Status Filter Pills */}
        <div className="flex justify-center">
          <div className="bg-white/60 backdrop-blur-lg rounded-full p-2 border border-white/30 shadow-xl">
            <div className="flex gap-2 flex-wrap">
              {/* All Tasks Tab */}
              <button
                onClick={() => setActiveTab("all")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  activeTab === "all"
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white scale-105"
                    : "bg-gradient-to-r from-gray-400 to-gray-500 text-white hover:from-purple-400 hover:to-indigo-500"
                }`}
              >
                <span>All Tasks</span>
                <span className="bg-white/30 rounded-full px-2 py-0.5 text-xs font-bold">
                  {plan.tasks.length}
                </span>
              </button>

              {/* Status Tabs */}
              {Object.entries(statusLabels).map(([status, label]) => {
                const count =
                  groupedTasks[status as keyof typeof groupedTasks]?.length ||
                  0;
                const statusColors = {
                  pending: { bg: "from-slate-400 to-slate-500" },
                  in_progress: { bg: "from-blue-400 to-blue-500" },
                  completed: { bg: "from-emerald-400 to-emerald-500" },
                  blocked: { bg: "from-rose-400 to-rose-500" },
                };
                const config =
                  statusColors[status as keyof typeof statusColors];

                return (
                  <button
                    key={status}
                    onClick={() => setActiveTab(status as Task["status"])}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      activeTab === status
                        ? `bg-gradient-to-r ${config.bg} text-white scale-105 ring-2 ring-white/50`
                        : `bg-gradient-to-r ${config.bg} text-white opacity-70 hover:opacity-100`
                    }`}
                  >
                    <span>{label}</span>
                    <span className="bg-white/30 rounded-full px-2 py-0.5 text-xs font-bold">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Task Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => {
              const priorityStyles = {
                low: {
                  gradient: "from-emerald-400 via-teal-500 to-cyan-600",
                  glow: "shadow-emerald-500/25",
                  bg: "from-emerald-50/80 to-teal-50/80",
                },
                medium: {
                  gradient: "from-amber-400 via-orange-500 to-yellow-600",
                  glow: "shadow-amber-500/25",
                  bg: "from-amber-50/80 to-orange-50/80",
                },
                high: {
                  gradient: "from-orange-400 via-red-500 to-pink-600",
                  glow: "shadow-orange-500/25",
                  bg: "from-orange-50/80 to-red-50/80",
                },
                urgent: {
                  gradient: "from-red-500 via-rose-600 to-pink-700",
                  glow: "shadow-red-500/30",
                  bg: "from-red-50/80 to-rose-50/80",
                },
              };

              const statusStyles = {
                pending: { ring: "ring-slate-200", dot: "bg-slate-400" },
                in_progress: { ring: "ring-blue-200", dot: "bg-blue-500" },
                completed: { ring: "ring-emerald-200", dot: "bg-emerald-500" },
                blocked: { ring: "ring-rose-200", dot: "bg-rose-500" },
              };

              const priority = priorityStyles[task.priority];
              const status = statusStyles[task.status];

              return (
                <div
                  key={task.id}
                  className={`group relative bg-gradient-to-br ${priority.bg} backdrop-blur-sm rounded-3xl p-6 border border-white/30 shadow-xl ${priority.glow} hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden`}
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-12 -translate-x-12"></div>
                  </div>

                  {/* Status Indicator */}
                  <div
                    className={`absolute top-4 right-4 w-4 h-4 rounded-full ${status.dot} ring-4 ${status.ring} animate-pulse`}
                  ></div>

                  {/* Task Number */}
                  <div
                    className={`absolute top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-r ${priority.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                  >
                    {index + 1}
                  </div>

                  {/* Priority Badge */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${priority.gradient} text-white text-xs font-bold shadow-lg mb-4 mt-8`}
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    {task.priority.toUpperCase()}
                  </div>

                  {/* Task Content */}
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-lg font-bold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors">
                      {task.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {task.description}
                    </p>

                    {/* Task Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/40">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
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
                          <div>
                            <p className="text-xs text-gray-600 font-medium">
                              Duration
                            </p>
                            <p className="text-sm font-bold text-gray-800">
                              {task.estimatedHours}h
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/40">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-6 h-6 ${status.dot} rounded-lg flex items-center justify-center`}
                          >
                            <svg
                              className="w-3 h-3 text-white"
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
                          <div>
                            <p className="text-xs text-gray-600 font-medium">
                              Status
                            </p>
                            <p className="text-sm font-bold text-gray-800 capitalize">
                              {task.status.replace("_", " ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Changer */}
                    <select
                      value={task.status}
                      onChange={(e) =>
                        onTaskStatusChange(
                          task.id,
                          e.target.value as Task["status"]
                        )
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 text-gray-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all duration-200"
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>

                    {/* Dependencies */}
                    {task.dependencies.length > 0 && (
                      <div className="pt-3 border-t border-white/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-4 h-4 bg-purple-500 rounded-md flex items-center justify-center">
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                              />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-gray-700">
                            Dependencies
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {task.dependencies.map((depId, i) => (
                            <span
                              key={depId}
                              className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                            >
                              #{i + 1}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                </div>
              );
            })
          ) : (
            /* Empty State for Active Tab */
            <div className="col-span-full text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                No tasks in{" "}
                {activeTab === "all"
                  ? "this project"
                  : statusLabels[activeTab as keyof typeof statusLabels]}
              </h3>
              <p className="text-gray-500">
                {activeTab === "all"
                  ? "Start by creating your first task!"
                  : `No tasks are currently ${
                      activeTab === "in_progress" ? "in progress" : activeTab
                    }.`}
              </p>
            </div>
          )}
        </div>

        {/* Empty State for Entire Project */}
        {plan.tasks.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Tasks Yet
            </h3>
            <p className="text-gray-600">
              Your tasks will appear here once they&apos;re generated by AI
            </p>
          </div>
        )}
      </div>

      {/* Critical Path */}
      {plan.criticalPath.length > 0 && (
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-xl border border-orange-100/50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Critical Path Analysis
            </h3>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <p className="text-gray-700 mb-6 leading-relaxed">
              These tasks form the critical path for project completion. Delays
              in these tasks will directly impact the overall timeline.
            </p>
            <div className="grid gap-3">
              {plan.criticalPath.map((taskId, index) => {
                const task = plan.tasks.find((t) => t.id === taskId);
                return task ? (
                  <div
                    key={taskId}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border border-orange-200/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Priority: {task.priority}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
