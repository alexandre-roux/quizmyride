# Quiz My Ride

Quiz My Ride is a fun, fast React app where you identify buses from photos. Pick the correct model from multiple choices
and rack up correct answers.

Built with Vite for speedy dev and Vitest for tests.

## Features

- Multiple-choice image quiz about buses
- Smooth screen transitions (Home → Quiz → Result)
- Fun feedback audio effects (gong, honk, crash, yay, sad)
- Simple scoring and results summary
- Modular React components with SCSS modules

## Tech Stack

- React 19
- Vite 7
- Vitest + Testing Library (JSDOM)
- Sass (sass-embedded)
- ESLint 9

## Getting Started

Prerequisites:

- Node.js 18+ and npm, or Yarn (a yarn.lock is present)

Install dependencies:

- With Yarn: `yarn`
- With npm: `npm install`

Run the app in development:

- Yarn: `yarn dev`
- npm: `npm run dev`

Build for production:

- Yarn: `yarn build`
- npm: `npm run build`

Preview the production build locally:

- Yarn: `yarn preview`
- npm: `npm run preview`

## Scripts

- dev: start Vite dev server
- build: build the app
- preview: preview built app
- lint: run ESLint
- test: run unit tests (Vitest)
- test:watch: run tests in watch mode
- test:run: run tests once in CI mode

## Testing

This project uses Vitest with Testing Library and JSDOM.

- Run all tests: `yarn test` or `npm test`
- Watch mode: `yarn test:watch` or `npm run test:watch`

Example tests live under `src/components/__tests__/`.

## Project Structure

- src/
  - App.jsx — top-level layout and screen switching
  - components/
    - QuizCard.jsx and styles — renders an image and answer options
  - containers/
    - Home/ — landing page and start button
    - Quiz/ — quiz flow and progress management
    - Result/ — end-of-quiz summary
  - utils/
    - audioManager.js — preloads and plays short sound effects
- public/ — static assets (e.g., images, logo)
- index.html — app root
- vite.config.js — Vite configuration

## Notes

- Audio is preloaded on app mount to minimize latency when playing feedback sounds.
- The default number of questions is currently set in `src/App.jsx`.

## Contributing

Issues and pull requests are welcome. Please run `yarn lint` (or `npm run lint`) and the test suite before submitting
changes.

## License

MIT License

Copyright (c) 2025 Quiz My Ride contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
