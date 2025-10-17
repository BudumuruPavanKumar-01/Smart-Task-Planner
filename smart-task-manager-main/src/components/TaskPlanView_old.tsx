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

  return (
    <div className="space-y-8">
      {/* Goal Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {plan.goal.title}
            </h2>
            <p className="text-gray-600 mt-1">Smart task breakdown with AI-powered planning</p>
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
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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

      {/* Beautiful Task Gallery */}
      <div className="space-y-8">
        {/* Status Filter Pills */}
        <div className="flex justify-center">
          <div className="bg-white/60 backdrop-blur-lg rounded-full p-2 border border-white/30 shadow-xl">
            <div className="flex gap-2">
              {Object.entries(statusLabels).map(([status, label]) => {
                const count = groupedTasks[status as keyof typeof groupedTasks]?.length || 0;
                const statusColors = {
                  pending: { bg: 'from-slate-400 to-slate-500', text: 'text-slate-700' },
                  in_progress: { bg: 'from-blue-400 to-blue-500', text: 'text-blue-700' },
                  completed: { bg: 'from-emerald-400 to-emerald-500', text: 'text-emerald-700' },
                  blocked: { bg: 'from-rose-400 to-rose-500', text: 'text-rose-700' }
                };
                const config = statusColors[status as keyof typeof statusColors];
                
                return (
                  <div
                    key={status}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${config.bg} text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                  >
                    <span>{label}</span>
                    <span className="bg-white/30 rounded-full px-2 py-0.5 text-xs font-bold">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Task Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plan.tasks.map((task, index) => {
              const statusConfig = {
                pending: { 
                  title: '📝 To Do',
                  color: 'from-slate-500 to-slate-600', 
                  bg: 'from-slate-50/80 to-slate-100/80',
                  border: 'border-slate-200/50',
                  shadow: 'shadow-slate-200/50',
                  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
                  count: tasks.length
                },
                in_progress: { 
                  title: '⚡ In Progress',
                  color: 'from-blue-500 to-blue-600', 
                  bg: 'from-blue-50/80 to-blue-100/80',
                  border: 'border-blue-200/50',
                  shadow: 'shadow-blue-200/50',
                  icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                  count: tasks.length
                },
                completed: { 
                  title: '✅ Completed',
                  color: 'from-emerald-500 to-emerald-600', 
                  bg: 'from-emerald-50/80 to-emerald-100/80',
                  border: 'border-emerald-200/50',
                  shadow: 'shadow-emerald-200/50',
                  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                  count: tasks.length
                },
                blocked: { 
                  title: '🚫 Blocked',
                  color: 'from-red-500 to-red-600', 
                  bg: 'from-red-50/80 to-red-100/80',
                  border: 'border-red-200/50',
                  shadow: 'shadow-red-200/50',
                  icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728',
                  count: tasks.length
                }
              };
              
              const config = statusConfig[status as keyof typeof statusConfig];
              
              return (
                <div
                  key={status}
                  className={`bg-gradient-to-br ${config.bg} backdrop-blur-sm rounded-3xl border-2 ${config.border} shadow-xl ${config.shadow} hover:shadow-2xl transition-all duration-300 min-w-[300px] lg:min-w-0`}
                >
                  {/* Column Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${config.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={config.icon} />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">{config.title}</h4>
                          <p className="text-sm text-gray-600">{config.count} task{config.count !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      
                      {/* Task Count Badge */}
                      <div className={`w-8 h-8 bg-gradient-to-r ${config.color} rounded-xl flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">{config.count}</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar for each column */}
                    <div className="w-full bg-white/40 rounded-full h-2 mb-4">
                      <div 
                        className={`bg-gradient-to-r ${config.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${totalTasks > 0 ? (config.count / totalTasks) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tasks Container */}
                  <div className="px-4 pb-6 space-y-4 max-h-[600px] overflow-y-auto">
                    {tasks.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">No tasks here yet</p>
                        <p className="text-gray-400 text-xs mt-1">Tasks will appear here as you move them</p>
                      </div>
                    ) : (
                      tasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onStatusChange={onTaskStatusChange}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Critical Path */}
      {plan.criticalPath.length > 0 && (
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl shadow-xl border border-orange-100/50 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Critical Path Analysis
            </h3>
          </div>
          
          <div className="space-y-3">
            {plan.criticalPath.map((taskId, index) => {
              const task = plan.tasks.find((t) => t.id === taskId);
              if (!task) return null;
              
              return (
                <div key={taskId} className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-200/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{task.title}</h4>
                    <p className="text-sm text-gray-600">Duration: {task.estimatedHours}h</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    task.status === 'blocked' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl shadow-xl border border-indigo-100/50 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Project Timeline
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-indigo-200/50">
              <h4 className="font-semibold text-gray-800 mb-2">Total Duration</h4>
              <p className="text-indigo-600 font-medium">{plan.estimatedDuration} days</p>
            </div>
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-purple-200/50">
              <h4 className="font-semibold text-gray-800 mb-2">Goal Deadline</h4>
              <p className="text-purple-600 font-medium">
                {plan.goal.deadline ? new Date(plan.goal.deadline).toLocaleDateString() : 'No deadline set'}
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-indigo-200/50">
            <h4 className="font-semibold text-gray-800 mb-3">AI Planning Insights</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{plan.tasks.length} tasks identified</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">{plan.criticalPath.length} critical path tasks</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
                <span className="text-gray-700 text-sm">Smart dependency mapping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}