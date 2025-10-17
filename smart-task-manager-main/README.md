# 🎯 Smart Task Planner

> _"Transform your goals into actionable tasks with AI-powered intelligence"_

An innovative task planning and project management application that leverages cutting-edge AI to break down complex goals into manageable, actionable tasks with intelligent timeline estimation, dependency mapping, and beautiful visual management.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-purple?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Key Features

### 🤖 **AI-Powered Intelligence**

- **Google Gemini Integration**: Advanced AI reasoning for intelligent task breakdown
- **Smart Timeline Estimation**: Realistic deadlines based on task complexity and dependencies
- **Critical Path Analysis**: Identify bottlenecks and optimize project flow
- **Intelligent Prioritization**: AI-driven task prioritization for maximum efficiency

### 🎨 **Beautiful Modern Interface**

- **Glassmorphism Design**: Stunning modern UI with backdrop blur effects
- **Interactive Animations**: Smooth transitions and engaging micro-interactions
- **Gradient Aesthetics**: Beautiful color gradients and modern visual elements
- **Tab-Based Organization**: Clean, organized task management with status-based filtering

### 📊 **Advanced Project Management**

- **Visual Progress Tracking**: Real-time progress indicators and completion metrics
- **Dependency Management**: Automatic dependency detection and visualization
- **Status Management**: Seamless task status transitions with visual feedback
- **Responsive Design**: Perfect experience across all devices and screen sizes

### 🚀 **Performance & Reliability**

- **Real-time Updates**: Instant task status changes and progress updates
- **SQLite Database**: Reliable local data persistence
- **Type-Safe Architecture**: Full TypeScript implementation for robust development
- **Modern Tech Stack**: Built with the latest web technologies

## 🏗️ Technical Architecture

### 🎯 Frontend (Next.js 15 + TypeScript)

- **Framework**: Next.js 15 with App Router for modern React development
- **Styling**: Tailwind CSS with custom glassmorphism components
- **State Management**: React hooks for efficient state management
- **Type Safety**: Full TypeScript implementation with strict type checking
- **UI Components**: Custom-built components with modern design patterns

### ⚡ Backend (Express.js + TypeScript)

- **Server**: Express.js with TypeScript for robust API development
- **Database**: SQLite for reliable local data storage
- **AI Integration**: Google Gemini API with multiple model fallbacks
- **API Design**: RESTful architecture with comprehensive error handling
- **Middleware**: CORS, JSON parsing, and error handling middleware

### 🧠 AI Integration

- **Primary Model**: Google Gemini Pro Latest for advanced reasoning
- **Fallback Models**: Multiple Gemini models for reliability
- **Smart Prompting**: Optimized prompts for accurate task breakdown
- **Error Handling**: Robust fallback mechanisms for AI failures

## 📋 Prerequisites

Before running this amazing application, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Google Gemini API Key** - [Get your free API key](https://ai.google.dev/)

## � Quick Start Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Waseem-Baig/smart-task-manager.git
cd smart-task-planner
```

### 2️⃣ Backend Setup

npm install

````

Create a `.env` file in the backend directory:

```bash
# Backend Environment Variables
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:3000
DATABASE_PATH=./database.db

# Optional: Additional Gemini Configuration
GEMINI_MODEL=gemini-pro-latest
````

### 3️⃣ Frontend Setup

```bash
cd .. # Go back to root directory
npm install
```

### 4️⃣ Start the Application

**Terminal 1 - Backend Server:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend Development Server:**

```bash
npm run dev
```

🎉 **That's it!** Open your browser and navigate to `http://localhost:3000` to experience the magic!

> 💡 **Pro Tip**: Create a `.env.local` file in the root directory for frontend environment variables:
>
> ```bash
> NEXT_PUBLIC_API_URL=http://localhost:3001/api
> ```

## 🎮 How to Use

### 1️⃣ **Create Your Goal**

- Enter a clear, specific goal in the beautiful input form
- Add context and requirements for better AI analysis
- Click "Generate Smart Plan" and watch the AI work its magic!

### 2️⃣ **Explore Your AI-Generated Plan**

- Review the intelligent task breakdown with dependencies
- Analyze the AI's strategic reasoning and recommendations
- View critical path analysis and timeline estimates

### 3️⃣ **Manage Your Tasks**

- Use the beautiful tab-based interface to organize tasks
- Update task status with real-time visual feedback
- Track progress with animated metrics and indicators

### 4️⃣ **Monitor Progress**

- Watch your completion percentage grow in real-time
- View estimated vs actual hours for better planning
- Celebrate milestones with beautiful visual feedback

## 🎨 Screenshots & Features

### 🏠 **Hero Landing Page**

- Stunning glassmorphism design with animated backgrounds
- Clear call-to-action with beautiful gradient buttons
- Modern typography and engaging visual elements

### 📝 **Smart Goal Input Form**

- Intuitive form with AI-powered suggestions
- Real-time validation and helpful tooltips
- Loading states with beautiful animations

### 📊 **Task Management Dashboard**

- Tab-based organization (Pending, In Progress, Completed, Blocked)
- Visual progress tracking with gradient progress bars
- Comprehensive metrics cards with icons and gradients

### 🧠 **AI Reasoning Display**

- Beautiful presentation of AI analysis and strategic thinking
- Critical path visualization with priority indicators
- Dependency mapping with visual connections

## 🛠️ Development & Production

### **Development Mode**

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
npm run dev
```

### **Production Deployment**

```bash
# Backend Production Build
cd backend
npm run build
npm start

# Frontend Production Build
npm run build
npm start
```

## 📡 API Reference

### 🔍 **Health & Status**

- `GET /api/health` - Server health check
- `GET /api/llm/status` - Google Gemini AI service status

- `POST /api/plans` - Create AI-powered task plans from goals
- `GET /api/plans/:goalId` - Retrieve specific task plans
- `PATCH /api/tasks/:taskId/status` - Update task status with real-time sync
- `GET /api/goals` - Retrieve all user goals

## � User Experience Highlights

### 🎨 **Visual Design Features**

- **Glassmorphism Effects**: Beautiful backdrop blur and transparency effects
- **Gradient Aesthetics**: Stunning color gradients throughout the interface
- **Smooth Animations**: Engaging micro-interactions and transitions
- **Responsive Layout**: Perfect experience on all devices and screen sizes

### 🚀 **Performance Features**

- **Real-time Updates**: Instant task status changes without page reload
- **Smart Caching**: Efficient data management for smooth interactions
- **Optimistic UI**: Immediate visual feedback for better user experience
- **Error Handling**: Graceful error states with helpful messaging

### 🧠 **AI Intelligence Features**

- **Context Understanding**: AI analyzes goal complexity and requirements
- **Smart Dependencies**: Automatic detection of task relationships
- **Timeline Optimization**: Realistic time estimates based on task analysis
- **Priority Mapping**: Intelligent task prioritization for optimal workflow

## 🎯 Usage Guide

### **Creating Your First Smart Plan**

1. 🌟 Navigate to `http://localhost:3000`
2. 📝 Enter your goal in the beautiful form interface
3. 🤖 Click "Generate Smart Plan" and watch AI create magic
4. 📊 Explore your personalized task breakdown with visual analytics

### **Managing Tasks Like a Pro**

- 📋 **Tab Navigation**: Switch between Pending, In Progress, Completed, and Blocked tasks
- ✅ **Status Updates**: Click task status dropdowns for instant updates
- 📈 **Progress Tracking**: Watch real-time progress metrics update
- 🎯 **Critical Path**: Focus on tasks that matter most for your deadline

### **Understanding AI Insights**

- 🧠 **Reasoning Analysis**: Read detailed AI explanations for task breakdown
- ⚡ **Critical Path**: Identify bottleneck tasks affecting your timeline
- 🔗 **Dependencies**: Visualize task relationships and prerequisites
- ⏱️ **Time Estimates**: Trust AI-calculated realistic completion times

## ⚙️ Advanced Configuration

### **Google Gemini AI Settings**

Customize AI behavior in `backend/src/services/llmService.ts`:

```typescript
// Model Configuration
const model = genAI.getGenerativeModel({
  model: "gemini-pro-latest", // Primary model
  generationConfig: {
    temperature: 0.7, // Creativity level (0-1)
    topP: 0.8, // Diversity control
    topK: 40, // Token selection scope
    maxOutputTokens: 2048, // Response length limit
  },
});
```

### **Fallback Models**

The application includes multiple fallback models for reliability:

- `gemini-pro-latest` (Primary)
- `gemini-1.5-pro-latest`
- `gemini-1.5-flash`
- `gemini-pro`
  });

```

### Database Configuration

SQLite database configuration can be modified in `backend/src/services/databaseService.ts`. For production, consider switching to PostgreSQL or MySQL.

## 🧪 Example Use Cases

### Product Launch

```

Goal: "Launch a mobile app in 3 months"
Result: 15+ tasks covering market research, development, testing, marketing, and launch activities

```

### Learning Project

```

Goal: "Learn React and build a portfolio website in 6 weeks"
Result: Structured learning path with coding exercises, projects, and deployment tasks

```

### Event Planning

```

Goal: "Organize a company retreat for 50 people in 2 months"
Result: Comprehensive task list covering venue, catering, activities, and logistics

````

## 🎨 Customization

### Styling

- Modify Tailwind CSS classes in component files
- Update color scheme in `tailwind.config.js`
- Add custom CSS in `src/app/globals.css`

### LLM Prompts

- Customize AI prompts in `backend/src/services/llmService.ts`
- Adjust response parsing logic for different output formats
- Fine-tune model parameters for your use case

## 🐛 Troubleshooting

### **Common Issues & Solutions**

#### 🔌 **Connection Issues**
```bash
# Problem: "Failed to connect to server"
# Solution: Verify backend is running
cd backend && npm run dev  # Should run on port 3001
````

#### 🤖 **AI Service Issues**

```bash
# Problem: "Gemini API Error"
# Solutions:
1. Verify your Google Gemini API key in backend/.env
2. Check API key has proper permissions
3. Ensure you have available quota
4. Test with: curl -H "Authorization: Bearer YOUR_API_KEY" https://ai.google.dev/
```

#### 💾 **Database Issues**

```bash
# Problem: Database connection errors
# Solutions:
1. Check write permissions in backend directory
2. Reset database: rm backend/database.db && restart backend
3. Verify DATABASE_PATH in .env file
```

#### 🔨 **Build & Development Issues**

```bash
# Problem: Build failures or dependency issues
# Solutions:
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### **Environment Variables Checklist**

```bash
# Backend (.env)
✅ GEMINI_API_KEY=your_actual_api_key
✅ PORT=3001
✅ FRONTEND_URL=http://localhost:3000
✅ DATABASE_PATH=./database.db

# Frontend (.env.local) - Optional
✅ NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🔒 Security & Best Practices

- 🔑 **Never commit API keys** - Use `.env` files and `.gitignore`
- 🛡️ **Input validation** - All user inputs are sanitized
- 🚦 **Rate limiting** - Implement for production deployments
- 🔐 **Authentication** - Add user auth for multi-user scenarios
- 📊 **Monitoring** - Log API usage and performance metrics

## � Performance & Scalability

- ⚡ **Caching Strategy**: Redis for session and API response caching
- 🗄️ **Database Optimization**: PostgreSQL for production with proper indexing
- 📦 **Code Splitting**: Lazy loading for optimal bundle size
- 🌐 **CDN Integration**: Static asset optimization
- 📈 **Monitoring**: APM tools for performance tracking

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Getting Started**

1. 🍴 Fork the repository
2. 🌿 Create your feature branch: `git checkout -b feature/amazing-feature`
3. ✨ Make your changes with clear, descriptive commits
4. 🧪 Test your changes thoroughly
5. 📝 Update documentation if needed
6. 🚀 Push to your branch: `git push origin feature/amazing-feature`
7. 🎯 Open a detailed Pull Request

### **Contribution Guidelines**

- Follow existing code style and patterns
- Add TypeScript types for all new code
- Include tests for new functionality
- Update README for significant changes
- Use conventional commit messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to:

- 🤖 **Google Gemini** for providing powerful AI capabilities
- ⚛️ **Next.js Team** for the incredible React framework
- 🎨 **Tailwind CSS** for beautiful utility-first styling
- 🚀 **Express.js Community** for the robust backend framework
- 💎 **TypeScript Team** for type-safe development
- 🎯 **Open Source Community** for inspiration and support

## 🔮 Future Roadmap

### **Phase 1: Enhanced Intelligence**

- 🧠 **Multi-Model AI**: Integration with Claude, GPT-4, and other models
- 📊 **Advanced Analytics**: Predictive timeline analysis and risk assessment
- 🎯 **Smart Recommendations**: AI-powered optimization suggestions

### **Phase 2: Collaboration Features**

- 👥 **Team Collaboration**: Multi-user workspaces and real-time sync
- 💬 **Communication Hub**: Integrated chat and comment system
- 📱 **Mobile Apps**: Native iOS and Android applications

### **Phase 3: Enterprise Ready**

- 🔐 **Enterprise Auth**: SSO, LDAP, and advanced security features
- 📈 **Advanced Reporting**: Custom dashboards and analytics
- 🔄 **Integrations**: Slack, Teams, Jira, and project management tools

---

<div align="center">

### 🌟 **Star this project if you found it helpful!** 🌟

**Built with ❤️ by [Waseem Baig](https://github.com/Waseem-Baig)**

_"Transforming goals into reality, one intelligent task at a time"_

[![GitHub Stars](https://img.shields.io/github/stars/Waseem-Baig/smart-task-manager?style=social)](https://github.com/Waseem-Baig/smart-task-manager)
[![GitHub Forks](https://img.shields.io/github/forks/Waseem-Baig/smart-task-manager?style=social)](https://github.com/Waseem-Baig/smart-task-manager)

</div>

- [ ] Team collaboration features
- [ ] Integration with calendar applications
- [ ] Export functionality (PDF, CSV)
- [ ] Mobile app development
- [ ] Advanced analytics and reporting
- [ ] Integration with project management tools (Jira, Trello)
- [ ] Voice input for goal creation
- [ ] Multi-language support

---

**Built with ❤️ using Next.js, TypeScript, and AI**
