"use client";

import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
}

const priorityConfig = {
  low: { 
    gradient: "from-emerald-400 to-emerald-500",
    bg: "from-emerald-50/80 to-emerald-100/80",
    border: "border-emerald-200/50",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "Low Priority",
    emoji: "🟢"
  },
  medium: { 
    gradient: "from-amber-400 to-orange-500",
    bg: "from-amber-50/80 to-orange-100/80",
    border: "border-amber-200/50",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z",
    label: "Medium Priority",
    emoji: "🟡"
  },
  high: { 
    gradient: "from-orange-400 to-red-500",
    bg: "from-orange-50/80 to-red-100/80",
    border: "border-orange-200/50",
    icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "High Priority",
    emoji: "🟠"
  },
  urgent: { 
    gradient: "from-red-500 to-pink-600",
    bg: "from-red-50/80 to-pink-100/80",
    border: "border-red-200/50",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z",
    label: "Urgent Priority",
    emoji: "🔴"
  }
};

const statusConfig = {
  pending: { 
    gradient: "from-slate-400 to-slate-500",
    bg: "from-slate-50/80 to-slate-100/80",
    border: "border-slate-200/50",
    label: "Pending",
    emoji: "⏳"
  },
  in_progress: { 
    gradient: "from-blue-500 to-indigo-600",
    bg: "from-blue-50/80 to-indigo-100/80",
    border: "border-blue-200/50",
    label: "In Progress",
    emoji: "⚡"
  },
  completed: { 
    gradient: "from-emerald-500 to-green-600",
    bg: "from-emerald-50/80 to-green-100/80",
    border: "border-emerald-200/50",
    label: "Completed",
    emoji: "✅"
  },
  blocked: { 
    gradient: "from-red-500 to-pink-600",
    bg: "from-red-50/80 to-pink-100/80",
    border: "border-red-200/50",
    label: "Blocked",
    emoji: "🚫"
  }
};

export default function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const priority = priorityConfig[task.priority];
  const status = statusConfig[task.status];

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusButtonColor = (buttonStatus: Task["status"]) => {
    const colors = {
      pending: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300',
      in_progress: 'bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-300',
      completed: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 border-emerald-300',
      blocked: 'bg-red-100 hover:bg-red-200 text-red-700 border-red-300'
    };
    return colors[buttonStatus];
  };

  return (
    <div className={`group bg-white/90 backdrop-blur-sm rounded-2xl border-2 ${status.border} shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:scale-[1.02]`}>
      {/* Header with Priority and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 bg-gradient-to-r ${priority.gradient} rounded-xl flex items-center justify-center shadow-md`}>
            <span className="text-white text-sm font-bold">{priority.emoji}</span>
          </div>
          <div className="text-xs">
            <div className="font-medium text-gray-600">{priority.label}</div>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${status.gradient} text-white shadow-sm`}>
          {status.emoji} {status.label}
        </div>
      </div>

      {/* Task Title */}
      <h4 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
        {task.title}
      </h4>

      {/* Task Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
        {task.description}
      </p>

      {/* Task Metadata */}
      <div className="space-y-3 mb-5">
        {/* Duration */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-gray-700 font-medium">{task.estimatedHours}h estimated</span>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-2 text-sm">
            <div className="w-5 h-5 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">Due {formatDate(task.dueDate)}</span>
          </div>
        )}

        {/* Dependencies */}
        {task.dependencies.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <div className="w-5 h-5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">{task.dependencies.length} dependencies</span>
          </div>
        )}
      </div>

      {/* Status Change Buttons */}
      <div className="border-t border-gray-200/50 pt-4">
        <p className="text-xs font-medium text-gray-500 mb-3">Change Status:</p>
        <div className="grid grid-cols-2 gap-2">
          {(["pending", "in_progress", "completed", "blocked"] as const).map((newStatus) => (
            <button
              key={newStatus}
              onClick={() => onStatusChange(task.id, newStatus)}
              disabled={task.status === newStatus}
              className={`
                px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200
                ${task.status === newStatus 
                  ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed' 
                  : `${getStatusButtonColor(newStatus)} hover:scale-105`
                }
              `}
            >
              {statusConfig[newStatus].emoji} {statusConfig[newStatus].label}
            </button>
          ))}
        </div>
      </div>

      {/* Completion Animation */}
      {task.status === 'completed' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-2xl animate-pulse"></div>
          <div className="absolute top-2 right-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}