```markdown
# Videoproductie-site2026 Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the Videoproductie-site2026 repository, a TypeScript project built with the Vite framework. You’ll learn how to structure files, write and organize code, and follow commit and testing conventions to contribute effectively to this codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for all filenames.
  - Example: `videoPlayer.tsx`, `mainPage.ts`

### Import Style
- Use **relative imports** for modules within the project.
  - Example:
    ```typescript
    import VideoPlayer from './videoPlayer';
    ```

### Export Style
- Use **default exports** for modules.
  - Example:
    ```typescript
    const VideoPlayer = () => { /* ... */ };
    export default VideoPlayer;
    ```

### Commit Messages
- Follow the **Conventional Commits** standard.
- Use the `feat` prefix for new features.
- Keep commit messages concise (average: 58 characters).
  - Example:
    ```
    feat: add responsive video player component
    ```

## Workflows

### Feature Development
**Trigger:** When implementing a new feature  
**Command:** `/feature-development`

1. Create a new branch for your feature.
2. Write code using camelCase filenames, relative imports, and default exports.
3. Commit changes using the `feat` prefix and a concise message.
4. Open a pull request for review.

### Testing
**Trigger:** When adding or updating functionality  
**Command:** `/run-tests`

1. Write test files using the `*.test.*` naming pattern.
2. Ensure tests cover new or changed code.
3. Run the test suite (framework unspecified; see project documentation or package scripts).

### Code Review
**Trigger:** After submitting a pull request  
**Command:** `/request-review`

1. Assign reviewers as per project guidelines.
2. Respond to feedback and make necessary changes.
3. Ensure all tests pass before merging.

## Testing Patterns

- Test files follow the pattern: `*.test.*` (e.g., `videoPlayer.test.ts`).
- The testing framework is unspecified—refer to project scripts or documentation for details.
- Place test files alongside the code they test or in a dedicated tests directory.

## Commands
| Command              | Purpose                                      |
|----------------------|----------------------------------------------|
| /feature-development | Start a new feature branch and workflow      |
| /run-tests           | Run the test suite for the project           |
| /request-review      | Request code review for a pull request       |
```