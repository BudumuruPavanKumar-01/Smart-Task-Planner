"use client";

import { useState } from "react";
import GoalInputForm from "@/components/GoalInputForm";
import TaskPlanView from "@/components/TaskPlanView";
import { GoalFormData, TaskPlan, Task } from "@/types";
import { apiService } from "@/services/apiService";

export default function Home() {
  const [currentPlan, setCurrentPlan] = useState<TaskPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoalSubmit = async (data: GoalFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.createTaskPlan({
        goalText: data.description,
        deadline: data.deadline || undefined,
      });

      if (response.success && response.data) {
        setCurrentPlan(response.data);
      } else {
        setError(response.error || "Failed to create task plan");
      }
    } catch (err) {
      console.error("Error creating task plan:", err);
      setError(
        "Failed to connect to the server. Please ensure the backend is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskStatusChange = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    if (!currentPlan) return;

    try {
      const response = await apiService.updateTaskStatus(taskId, newStatus);

      if (response.success) {
        // Update the local state
        setCurrentPlan((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            tasks: prev.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    status: newStatus,
                    completedAt:
                      newStatus === "completed" ? new Date() : undefined,
                  }
                : task
            ),
          };
        });
      } else {
        setError(response.error || "Failed to update task status");
      }
    } catch (err) {
      console.error("Error updating task status:", err);
      setError("Failed to update task status");
    }
  };

  const handleNewPlan = () => {
    setCurrentPlan(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <header className="backdrop-blur-sm bg-white/80 border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Smart Task Planner
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Transform your ambitious goals into{" "}
                <span className="font-semibold text-indigo-600">actionable tasks</span>{" "}
                with AI-powered intelligent planning
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Error Message */}
          {error && (
            <div className="mb-8 animate-in slide-in-from-top duration-300">
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
                    <p className="text-red-700">{error}</p>
                    <button
                      onClick={() => setError(null)}
                      className="mt-3 text-sm font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
                    >
                      Dismiss →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          {!currentPlan ? (
            <div className="animate-in fade-in duration-500">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Powered by Google Gemini AI
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:bg-white/80 transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">AI-Powered Analysis</h3>
                    <p className="text-sm text-gray-600">Smart breakdown of complex goals into manageable tasks</p>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:bg-white/80 transition-all duration-300">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Timeline Planning</h3>
                    <p className="text-sm text-gray-600">Realistic schedules with dependencies and priorities</p>
                  </div>
                  
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:bg-white/80 transition-all duration-300">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Progress Tracking</h3>
                    <p className="text-sm text-gray-600">Visual progress monitoring with status updates</p>
                  </div>
                </div>
              </div>

              <GoalInputForm onSubmit={handleGoalSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              {/* Task Plan Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Task Plan</h2>
                  <p className="text-gray-600">AI-generated breakdown for: <span className="font-semibold text-indigo-600">{currentPlan?.goal.title}</span></p>
                </div>
                <button
                  onClick={() => {
                    setCurrentPlan(null);
                    setError(null);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Plan
                </button>
              </div>
              
              <TaskPlanView
                plan={currentPlan!}
                onTaskStatusChange={handleTaskStatusChange}
              />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="backdrop-blur-sm bg-white/50 border-t border-white/20 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span className="font-bold text-gray-800">Smart Task Planner</span>
              </div>
              <p className="text-gray-600 mb-2">
                Transforming goals into reality with AI-powered planning
              </p>
              <p className="text-sm text-gray-500">
                Built with ❤️ using Next.js, TypeScript, and Google Gemini AI
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
