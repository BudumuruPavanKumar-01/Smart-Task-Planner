import {
  CreateTaskPlanRequest,
  CreateTaskPlanResponse,
  TaskPlan,
  APIResponse,
  Task,
  Goal,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return this.makeRequest<{ status: string; timestamp: string }>("/health");
  }

  async checkLLMStatus(): Promise<APIResponse<{ available: boolean }>> {
    return this.makeRequest<APIResponse<{ available: boolean }>>("/llm/status");
  }

  async createTaskPlan(
    request: CreateTaskPlanRequest
  ): Promise<CreateTaskPlanResponse> {
    return this.makeRequest<CreateTaskPlanResponse>("/plans", {
      method: "POST",
      body: JSON.stringify(request),
    });
  }

  async getTaskPlan(goalId: string): Promise<APIResponse<TaskPlan>> {
    return this.makeRequest<APIResponse<TaskPlan>>(`/plans/${goalId}`);
  }

  async updateTaskStatus(
    taskId: string,
    status: Task["status"]
  ): Promise<APIResponse> {
    return this.makeRequest<APIResponse>(`/tasks/${taskId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  async getGoals(): Promise<APIResponse<Goal[]>> {
    return this.makeRequest<APIResponse<Goal[]>>("/goals");
  }
}

export const apiService = new ApiService();
export default apiService;
