# PS-PS Project Overview

## Purpose
PS-PS is a React + TypeScript + Vite web application project. It appears to be a minimal template setup for developing React applications with modern tooling.

## Tech Stack
- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.2
- **Package Manager**: Bun (with npm scripts available)
- **Bundler**: Vite with SWC for Fast Refresh
- **Linting**: ESLint 9.33.0 with TypeScript ESLint
- **Styling**: CSS files (App.css, index.css)

## Project Structure
```
ps-ps/
├── src/               # Source code
│   ├── App.tsx       # Main App component
│   ├── main.tsx      # Entry point
│   ├── App.css       # App-specific styles
│   ├── index.css     # Global styles
│   └── assets/       # Static assets
├── public/           # Public static files
├── docs/             # Documentation
├── .specstory/       # Story/spec files
├── .serena/          # Serena configuration
├── package.json      # Node dependencies and scripts
├── tsconfig.json     # TypeScript config (references)
├── tsconfig.app.json # App TypeScript config
├── tsconfig.node.json# Node TypeScript config
├── vite.config.ts    # Vite configuration
└── eslint.config.js  # ESLint configuration
```

## Development Environment
- Platform: Darwin (macOS)
- Node.js module type: ESM modules