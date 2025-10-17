"use client";

import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}

const priorityConfig = {
  low: { 
    gradient: "from-green-400 to-green-500",
    bg: "from-green-50 to-green-100",
    border: "border-green-200",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  medium: { 
    gradient: "from-yellow-400 to-yellow-500",
    bg: "from-yellow-50 to-yellow-100",
    border: "border-yellow-200",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
  },
  high: { 
    gradient: "from-orange-400 to-orange-500",
    bg: "from-orange-50 to-orange-100",
    border: "border-orange-200",
    icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  urgent: { 
    gradient: "from-red-400 to-red-500",
    bg: "from-red-50 to-red-100",
    border: "border-red-200",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
  }
};

const statusConfig = {
  pending: { 
    gradient: "from-gray-400 to-gray-500",
    bg: "from-gray-50 to-gray-100",
    border: "border-gray-200"
  },
  in_progress: { 
    gradient: "from-blue-400 to-blue-500",
    bg: "from-blue-50 to-blue-100",
    border: "border-blue-200"
  },
  completed: { 
    gradient: "from-green-400 to-green-500",
    bg: "from-green-50 to-green-100",
    border: "border-green-200"
  },
  blocked: { 
    gradient: "from-red-400 to-red-500",
    bg: "from-red-50 to-red-100",
    border: "border-red-200"
  }
};

const statusOptions: { value: Task["status"]; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "blocked", label: "Blocked" },
];

export default function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as Task["status"]);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString();
  };

  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300">
      {/* Header with Title and Priority */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base font-bold text-gray-800 flex-1 mr-3 group-hover:text-gray-900">
          {task.title}
        </h3>
        
        {/* Priority Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${priority.bg} ${priority.border} border`}>
          <div className={`w-4 h-4 bg-gradient-to-r ${priority.gradient} rounded-full flex items-center justify-center`}>
            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={priority.icon} />
            </svg>
          </div>
          <span className="text-xs font-semibold text-gray-700">
            {task.priority.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {task.description}
      </p>

      {/* Task Details */}
      <div className="grid grid-cols-1 gap-2 mb-4">
        <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">Estimated</span>
          </div>
          <span className="text-sm font-bold text-blue-600">{task.estimatedHours}h</span>
        </div>

        {task.dueDate && (
          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Due Date</span>
            </div>
            <span className="text-sm font-bold text-purple-600">{formatDate(task.dueDate)}</span>
          </div>
        )}

        {task.completedAt && (
          <div className="flex items-center justify-between p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Completed</span>
            </div>
            <span className="text-sm font-bold text-green-600">{formatDate(task.completedAt)}</span>
          </div>
        )}
      </div>

      {/* Status Selector */}
      <div className="mb-4">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold border-2 bg-gradient-to-r ${status.bg} ${status.border} focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dependencies */}
      {task.dependencies.length > 0 && (
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-md flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">Dependencies</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {task.dependencies.map((depId, index) => (
              <span
                key={depId}
                className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 rounded-full text-xs font-medium border border-indigo-200"
              >
                Task {index + 1}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
