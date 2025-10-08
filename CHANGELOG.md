# Changelog

All notable changes to this project will be documented in this file.

## [0.3.3] - 2025-09-25
### Changed
- Complete migration of remaining components and tests from JSX to TypeScript (tsx).
- Removed obsolete .jsx files no longer used by the application.
- Minor updates to styles and README.

### Tests
- Added/converted unit tests for AnswerOptions, QuizCard, and ResultMessage to TypeScript. All tests passing via `yarn test:run`.


## [0.3.4] - 2025-10-02
### Changed
- Completed TypeScript migration: converted remaining unit tests to TypeScript.
- Removed unused JavaScript shims and legacy test files in src (now TS-only under src/).

### Tests
- Updated audioManager tests to TypeScript and aligned imports.

