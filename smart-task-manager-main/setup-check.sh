#!/bin/bash

echo "🚀 Smart Task Planner - Setup Verification"
echo "=========================================="
echo ""

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "✅ Node.js version: $(node --version)"
else
    echo "❌ Node.js is not installed"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    echo "✅ npm version: $(npm --version)"
else
    echo "❌ npm is not installed"
    exit 1
fi

echo ""
echo "📁 Project Structure:"
echo "├── src/                  # Frontend source code"
echo "│   ├── app/             # Next.js App Router"
echo "│   ├── components/      # React components"
echo "│   ├── services/        # API services"
echo "│   └── types/          # TypeScript definitions"
echo "├── backend/             # Backend API server"
echo "│   └── src/            # Backend source code"
echo "│       ├── services/   # Business logic"
echo "│       └── types/      # Backend types"
echo "└── README.md           # Documentation"

echo ""
echo "🔧 Setup Instructions:"
echo "1. Copy environment files:"
echo "   cp .env.local.example .env.local"
echo "   cp backend/.env.example backend/.env"
echo ""
echo "2. Add your OpenAI API key to backend/.env:"
echo "   OPENAI_API_KEY=your_openai_api_key_here"
echo ""
echo "3. Start the application:"
echo "   npm run dev:all"
echo ""
echo "4. Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001/api"
echo ""
echo "🎯 Example Goals to Try:"
echo "• \"Launch a mobile app in 3 months\""
echo "• \"Organize a wedding in 6 months\""
echo "• \"Learn React and build a portfolio in 8 weeks\""
echo "• \"Start a small business in 4 months\""
echo ""
echo "✨ Features Implemented:"
echo "✅ AI-powered task breakdown using OpenAI GPT-4"
echo "✅ Interactive Kanban board for task management"
echo "✅ Task dependencies and critical path analysis"
echo "✅ Progress tracking with visual indicators"
echo "✅ Responsive design for mobile and desktop"
echo "✅ Real-time task status updates"
echo "✅ TypeScript for type safety"
echo "✅ RESTful API with comprehensive error handling"
echo "✅ SQLite database with automatic initialization"
echo ""
echo "🏁 You're all set! Happy planning! 🎉"