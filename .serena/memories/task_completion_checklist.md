# Task Completion Checklist

When completing a coding task in this project, ensure you:

## Code Quality Checks
1. **Run Linting**: Execute `bun run lint` to ensure code follows ESLint rules
2. **Type Check**: Run `bun run build` or `tsc --noEmit` to verify TypeScript types
3. **Test Build**: Ensure `bun run build` completes successfully

## Before Committing
1. **Verify no TypeScript errors**: Check that strict mode requirements are met
2. **Check for unused variables**: TypeScript config enforces no unused locals/parameters
3. **Review imports**: Ensure all imports are used (no unchecked side effects)
4. **Format consistency**: Follow existing code style patterns

## Manual Verification
1. **Run dev server**: `bun run dev` and test changes in browser
2. **Check console**: Ensure no runtime errors in browser console
3. **Test functionality**: Verify new/modified features work as expected

## Common Issues to Check
- React Hook rules violations (detected by eslint-plugin-react-hooks)
- React Refresh compatibility (for hot reload)
- TypeScript strict mode compliance
- Proper file extensions (.tsx for React components, .ts for logic)

## Final Steps
1. Run `bun run lint` - Must pass without errors
2. Run `bun run build` - Must complete successfully
3. Test in development: `bun run dev`
4. Preview production build: `bun run preview` (optional)

If all checks pass, the task is ready for review/commit.