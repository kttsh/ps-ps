# Suggested Commands for Development

## Package Management (using Bun)
- `bun install` - Install dependencies
- `bun add <package>` - Add a new dependency
- `bun add -d <package>` - Add a dev dependency
- `bun update` - Update dependencies

## Development Scripts
- `bun run dev` - Start development server with hot reload (Vite)
- `bun run build` - Build for production (TypeScript check + Vite build)
- `bun run lint` - Run ESLint on all files
- `bun run preview` - Preview production build locally

## TypeScript
- `tsc -b` - Build TypeScript (part of build script)
- `tsc --noEmit` - Type check without emitting files

## System Commands (macOS/Darwin)
- `ls -la` - List files with details
- `find . -name "*.tsx"` - Find TypeScript React files
- `grep -r "pattern" src/` - Search in source files
- `open .` - Open current directory in Finder
- `git status` - Check git status
- `git add .` - Stage changes
- `git commit -m "message"` - Commit changes
- `git push` - Push to remote

## Development Workflow
1. `bun install` - Install dependencies
2. `bun run dev` - Start dev server
3. Make changes to code
4. `bun run lint` - Check for linting errors
5. `bun run build` - Build and type check
6. Commit changes with git