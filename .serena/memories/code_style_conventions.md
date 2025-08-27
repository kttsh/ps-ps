# Code Style and Conventions

## TypeScript Configuration
- **Target**: ES2022
- **Module**: ESNext with bundler module resolution
- **Strict Mode**: Enabled (`strict: true`)
- **JSX**: react-jsx
- **Type Checking**: 
  - No unused locals
  - No unused parameters
  - No fallthrough cases in switch statements
  - No unchecked side effect imports

## ESLint Configuration
- Uses TypeScript ESLint recommended rules
- React Hooks plugin (recommended-latest)
- React Refresh plugin for Vite
- Global ignores for `dist` directory
- ECMAScript 2020 compatibility

## File Naming Conventions
- React components: `.tsx` extension
- TypeScript files: `.ts` extension
- CSS files: `.css` extension paired with components
- Main entry point: `main.tsx`
- App component: `App.tsx`

## Import Style
- ESM imports (type: "module" in package.json)
- Verbatim module syntax enforced
- Allow importing TS extensions in bundler mode

## React Conventions
- Functional components preferred (based on React 19 and hooks usage)
- React Refresh enabled for hot module replacement

## Code Organization
- Source code in `src/` directory
- Assets in `src/assets/`
- Public files in `public/`
- Configuration files at root level