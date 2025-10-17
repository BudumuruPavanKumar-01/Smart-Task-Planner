import { GoogleGenerativeAI } from "@google/generative-ai";
import { LLMResponse } from "../types";

export class LLMService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      console.warn("No Gemini API key found. Using mock responses.");
      this.genAI = null as any;
      this.model = null;
    } else {
      this.genAI = new GoogleGenerativeAI(apiKey);
      // Try different model names that are commonly available
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }
  }

  async generateTaskPlan(
    goalText: string,
    deadline?: string,
    additionalContext?: string
  ): Promise<LLMResponse> {
    // Try Gemini API first, fallback to mock if not available
    if (this.genAI) {
      // Try the most common available model names
      const modelNames = [
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash",
        "gemini-1.5-pro-latest",
        "gemini-1.5-pro",
        "gemini-pro-latest",
        "gemini-pro",
        "models/gemini-pro",
        "models/gemini-1.5-flash",
      ];

      for (const modelName of modelNames) {
        try {
          console.log(`Trying model: ${modelName}`);
          const model = this.genAI.getGenerativeModel({ model: modelName });
          const prompt = this.createPrompt(
            goalText,
            deadline,
            additionalContext
          );
          const result = await model.generateContent(prompt);
          const response = result.response.text();

          if (!response) {
            throw new Error("No response from Gemini");
          }

          console.log(`Successfully used model: ${modelName}`);
          return this.parseResponse(response);
        } catch (error) {
          console.error(
            `Error with model ${modelName}:`,
            error instanceof Error ? error.message : String(error)
          );
          continue; // Try next model
        }
      }

      console.log(
        "All Gemini models failed, falling back to mock task plan generation..."
      );
    } else {
      console.log(
        "Gemini API not configured, using mock task plan generation..."
      );
    }

    // Generate a mock task plan based on the goal
    return this.generateMockTaskPlan(goalText, deadline, additionalContext);
  }
  private createPrompt(
    goalText: string,
    deadline?: string,
    additionalContext?: string
  ): string {
    let prompt = `You are an expert project manager. Break down this goal into a clear, actionable task plan.

GOAL: "${goalText}"`;

    if (deadline) {
      prompt += `\nDEADLINE: ${deadline}`;
    }

    if (additionalContext) {
      prompt += `\nCONTEXT: ${additionalContext}`;
    }

    prompt += `

REQUIREMENTS:
- Create 4-7 specific, actionable tasks
- Each task should take 5-40 hours
- Use clear, concise task titles (3-8 words)
- Write practical descriptions focusing on deliverables
- Set realistic priorities: "high", "medium", "low", or "urgent"
- Only list dependencies that truly must be completed first
- Consider the logical sequence of work

RESPOND WITH ONLY THIS JSON FORMAT (no other text):
{
  "tasks": [
    {
      "title": "Clear Task Name",
      "description": "Specific description of what needs to be accomplished and the expected outcome",
      "estimatedHours": 15,
      "priority": "high",
      "dependencies": []
    }
  ],
  "reasoning": "Brief explanation of the approach and key decisions made in breaking down this goal",
  "estimatedDuration": 80,
  "criticalPath": ["Task 1", "Task 2"]
}`;

    return prompt;
  }

  private parseResponse(response: string): LLMResponse {
    try {
      // Remove any markdown code blocks and extra text
      let cleanResponse = response.trim();

      // Remove markdown code blocks if present
      cleanResponse = cleanResponse
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "");

      // Extract JSON from the response
      const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Validate and fix the response structure
      if (!parsed.tasks || !Array.isArray(parsed.tasks)) {
        throw new Error("Invalid tasks format");
      }

      // Ensure each task has required fields
      parsed.tasks = parsed.tasks.map((task: any) => ({
        title: task.title || "Unnamed Task",
        description: task.description || "No description provided",
        estimatedHours:
          typeof task.estimatedHours === "number" ? task.estimatedHours : 8,
        priority: ["high", "medium", "low", "urgent"].includes(task.priority)
          ? task.priority
          : "medium",
        dependencies: Array.isArray(task.dependencies) ? task.dependencies : [],
      }));

      // Provide defaults for missing fields
      const result: LLMResponse = {
        tasks: parsed.tasks,
        reasoning: parsed.reasoning || "Task breakdown completed successfully",
        estimatedDuration:
          typeof parsed.estimatedDuration === "number"
            ? parsed.estimatedDuration
            : parsed.tasks.reduce(
                (sum: number, task: any) => sum + task.estimatedHours,
                0
              ),
        criticalPath: Array.isArray(parsed.criticalPath)
          ? parsed.criticalPath
          : parsed.tasks.map((task: any) => task.title),
      };

      return result;
    } catch (error) {
      console.error("Error parsing LLM response:", error);
      console.error("Raw response:", response.substring(0, 500) + "...");

      // Fallback response if parsing fails
      return {
        tasks: [
          {
            title: "Complete the goal",
            description: "Work on completing the specified goal",
            estimatedHours: 8,
            priority: "medium",
            dependencies: [],
          },
        ],
        reasoning:
          "Unable to parse the detailed breakdown. Please try again with a more specific goal.",
        estimatedDuration: 1,
        criticalPath: ["Complete the goal"],
      };
    }
  }

  private generateMockTaskPlan(
    goalText: string,
    deadline?: string,
    additionalContext?: string
  ): LLMResponse {
    // Generate realistic mock tasks based on common goal patterns
    const mockTasks = this.generateTasksForGoal(goalText);
    const mockReasoning = `Generated mock task plan for: "${goalText}". This is a demo version with pre-defined tasks since OpenAI API quota has been exceeded. The tasks are structured to show realistic project breakdown with dependencies and timelines.`;

    return {
      tasks: mockTasks,
      reasoning: mockReasoning,
      estimatedDuration: 280, // Total hours from mock tasks
      criticalPath: mockTasks.map((task) => task.title),
    };
  }

  private generateTasksForGoal(goalText: string): any[] {
    const lowerGoal = goalText.toLowerCase();

    // Common task templates based on goal keywords
    if (lowerGoal.includes("product") || lowerGoal.includes("launch")) {
      return [
        {
          title: "Market Research & Analysis",
          description:
            "Conduct thorough market research to understand target audience and competition",
          estimatedHours: 20,
          priority: "high",
          category: "planning",
          dependencies: [],
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          title: "Product Design & Prototyping",
          description:
            "Create detailed product designs and build initial prototypes",
          estimatedHours: 40,
          priority: "high",
          category: "development",
          dependencies: ["Market Research & Analysis"],
          dueDate: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          title: "Marketing Strategy Development",
          description:
            "Develop comprehensive marketing strategy and promotional materials",
          estimatedHours: 25,
          priority: "medium",
          category: "marketing",
          dependencies: ["Market Research & Analysis"],
          dueDate: new Date(
            Date.now() + 21 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          title: "Product Testing & Quality Assurance",
          description:
            "Conduct thorough testing and quality assurance processes",
          estimatedHours: 30,
          priority: "high",
          category: "testing",
          dependencies: ["Product Design & Prototyping"],
          dueDate: new Date(
            Date.now() + 28 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          title: "Launch Preparation & Execution",
          description:
            "Prepare for launch including logistics, PR, and distribution setup",
          estimatedHours: 35,
          priority: "high",
          category: "launch",
          dependencies: [
            "Marketing Strategy Development",
            "Product Testing & Quality Assurance",
          ],
          dueDate: new Date(
            Date.now() + 35 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      ];
    } else if (lowerGoal.includes("learn") || lowerGoal.includes("study")) {
      return [
        {
          title: "Learning Plan Setup",
          description:
            "Create structured learning plan with milestones and resources",
          estimatedHours: 5,
          priority: "high",
          category: "planning",
          dependencies: [],
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          title: "Foundation Concepts",
          description: "Study and master fundamental concepts and principles",
          estimatedHours: 30,
          priority: "high",
          category: "learning",
          dependencies: ["Learning Plan Setup"],
          dueDate: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          title: "Practical Exercises",
          description: "Complete hands-on exercises and practice problems",
          estimatedHours: 40,
          priority: "medium",
          category: "practice",
          dependencies: ["Foundation Concepts"],
          dueDate: new Date(
            Date.now() + 28 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          title: "Project Implementation",
          description: "Build a real project to apply learned concepts",
          estimatedHours: 50,
          priority: "medium",
          category: "project",
          dependencies: ["Practical Exercises"],
          dueDate: new Date(
            Date.now() + 42 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      ];
    } else {
      // Generic task breakdown for any goal
      return [
        {
          title: "Goal Planning & Research",
          description: `Research and plan the approach for: ${goalText}`,
          estimatedHours: 15,
          priority: "high",
          category: "planning",
          dependencies: [],
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          title: "Initial Implementation",
          description: "Begin implementing the main components of the goal",
          estimatedHours: 35,
          priority: "high",
          category: "implementation",
          dependencies: ["Goal Planning & Research"],
          dueDate: new Date(
            Date.now() + 21 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          title: "Review & Refinement",
          description: "Review progress and refine approach based on learnings",
          estimatedHours: 20,
          priority: "medium",
          category: "review",
          dependencies: ["Initial Implementation"],
          dueDate: new Date(
            Date.now() + 28 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
        {
          title: "Final Execution",
          description: "Complete final steps and achieve the goal",
          estimatedHours: 25,
          priority: "high",
          category: "completion",
          dependencies: ["Review & Refinement"],
          dueDate: new Date(
            Date.now() + 35 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      ];
    }
  }

  async isServiceAvailable(): Promise<boolean> {
    if (!this.model) {
      return false;
    }

    try {
      // Test with a simple prompt
      const result = await this.model.generateContent("Hello");
      return !!result.response.text();
    } catch (error) {
      console.error("Gemini service not available:", error);
      return false;
    }
  }
}
