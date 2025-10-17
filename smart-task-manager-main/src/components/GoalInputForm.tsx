"use client";

import { useState } from "react";
import { GoalFormData } from "@/types";

interface GoalInputFormProps {
  onSubmit: (data: GoalFormData) => void;
  isLoading: boolean;
}

export default function GoalInputForm({
  onSubmit,
  isLoading,
}: GoalInputFormProps) {
  const [formData, setFormData] = useState<GoalFormData>({
    title: "",
    description: "",
    deadline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            What&apos;s Your Goal?
          </h2>
          <p className="text-gray-600">Tell us what you want to achieve, and we&apos;ll create a smart plan for you</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Goal Title
              </span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Launch a mobile app, Learn web development, Start a business..."
              className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Goal Description
              </span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your goal in detail. What do you want to achieve? What are your requirements, constraints, or specific needs?"
              rows={4}
              className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-gray-800 placeholder-gray-500 resize-none"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="deadline"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Target Deadline
                <span className="text-xs text-gray-500 font-normal">(Optional)</span>
              </span>
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-gray-800"
              disabled={isLoading}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={
                isLoading || !formData.title.trim() || !formData.description.trim()
              }
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  </div>
                  <span>AI is analyzing your goal...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Smart Task Plan
                </>
              )}
            </button>
            
            {!isLoading && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Powered by Google Gemini AI • Takes ~3-5 seconds
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
