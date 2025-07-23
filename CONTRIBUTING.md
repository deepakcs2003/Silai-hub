# Contributing to GuddiSilai 👗✨

Welcome to GuddiSilai! We're thrilled that you're interested in contributing to our open-source tailoring platform. Whether you're fixing bugs, adding features, improving documentation, or suggesting new ideas, your contributions help make GuddiSilai better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Project Structure](#project-structure)
- [Coding Guidelines](#coding-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

## 🤝 Code of Conduct

By contributing to GuddiSilai, you agree to follow these guidelines:

- ✅ **Be respectful** – Value everyone’s input and communicate kindly.
- ✅ **Be inclusive** – Use welcoming language and support all contributors.
- ✅ **Be constructive** – Offer helpful feedback and focus on solutions.
- ✅ **Ask for help** – Don’t hesitate to seek guidance or clarification.
- ❌ **No spamming** – Stay on-topic in all discussions and contributions.

If you witness or experience any violation, please report it via a GitHub issue or contact a project maintainer directly.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **MongoDB** (or access to MongoDB Atlas)

### First-time Setup

1. **Fork the repository**

   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR_USERNAME/Silai-hub.git
   cd Silai-hub
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/YOUR_USERNMAE/Silai-hub.git
   ```

## 🛠️ Development Setup

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the `backend` directory with:

   ```env
   MONGO_URI=mongodb://localhost:27017/silai-hub
   JWT_SECRET=your_super_secret_jwt_key_here
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the backend server**

   ```bash
   # For development with auto-reload
   npm run dev

   # For production
   npm start
   ```

### Frontend Setup

1. **Navigate to root directory**

   ```bash
   cd ..  # if you're in backend directory
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## 🤲 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🎨 **UI/UX enhancements**
- 🧪 **Testing**
- 🔧 **Code refactoring**
- 🌐 **Accessibility improvements**

### Finding Something to Work On

1. Check our [GitHub Issues](https://github.com/Kunal25Das/Silai-hub/issues)
2. Look for issues labeled like `level1` or `gssoc25`
3. Check our project roadmap in the README
4. Suggest new features by opening an issue

### Working on an Issue

1. **Comment on the issue** to let others know you're working on it
2. **Create a new branch** from `main`:
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test your changes thoroughly**
5. **Commit and push**

## 📁 Project Structure

```
Silai-hub/
├── backend/                 # Node.js/Express backend
│   ├── Config/             # Database configuration
│   ├── Controller/         # Route controllers
│   ├── Models/             # MongoDB schemas
│   ├── Routes/             # API routes
│   ├── Middleware/         # Custom middleware
│   └── app.js              # Main server file
├── src/                    # React frontend
│   ├── Components/         # Reusable components
│   ├── Pages/              # Page components
│   ├── Context/            # React context
│   ├── Common/             # Shared utilities
│   └── Assist/             # Static assets
├── public/                 # Public assets
└── docs/                   # Documentation
```

## 📝 Coding Guidelines

### General Principles

- Write clean, readable, and maintainable code
- Follow existing code patterns and conventions
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable and function names

### Frontend (React)

- Use functional components with hooks
- Follow the existing folder structure
- Use consistent naming conventions:
  - Components: PascalCase (`UserProfile.js`)
  - Files/folders: camelCase (`userProfile.js`)
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Backend (Node.js/Express)

- Follow RESTful API conventions
- Use async/await for asynchronous operations
- Implement proper error handling
- Add input validation and sanitization
- Follow the MVC pattern

### CSS/Styling

- Use Tailwind CSS classes consistently
- Maintain responsive design principles
- Follow the color palette defined in the README
- Keep custom CSS well-organized

## 🔄 Pull Request Process

### Before Submitting

1. **Sync with upstream**

   ```bash
      git checkout main
      git pull upstream main
      git checkout your-branch-name
      git merge main
   ```

2. **Test your changes (if applicable)**

   ```bash
   # Run frontend tests
   npm test

   # Test backend (if tests exist)
   cd backend
   npm test
   ```

3. **Check for linting errors**

   ```bash
   npm run lint  # if linting is set up
   ```

4. **Commiting**
   ```bash
      git add .
      git commit -m "Add some feature"
   ```
   Commit messages must be clear and easily understandable.

### Submitting the PR

1. **Push your branch**

   ```bash
   git push origin your-branch
   ```

2. **Create a Pull Request** on GitHub with:

   - Clear title describing the change
   - Detailed description of what was changed and why
   - Screenshots (for UI changes)
   - Link to related issues

3. **PR Template**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Code refactoring

   ## Testing (if applicable)

   - [ ] Tests pass locally
   - [ ] Manual testing completed

   ## Screenshots (if applicable)
   ```

### After Submitting

- Respond to feedback promptly
- Make requested changes in the same branch
- Keep the PR updated with the latest main branch

## 🐛 Issue Guidelines

### Reporting Bugs

Use the bug report template and include:

- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable
- Environment details (OS, browser, Node version)

### Requesting Features

Use the feature request template and include:

- Clear description of the feature
- Use case and benefits
- Mockups or examples if applicable

## 👥 Community

### Getting Help

- **GitHub Discussions**: For questions and general discussion
- **Issues**: For bug reports and feature requests
- **Pull Requests**: For code contributions

## 📄 License

By contributing to GuddiSilai, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to GuddiSilai! Together, we're building something amazing for the tailoring community. 🎉

_"Silai ki duniya, ab open source!"_ ✨
