# QA Portfolio

A React-based portfolio showcasing quality assurance (QA) test cases and practices, designed to highlight proficiency in automated testing, particularly using Playwright.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup and Installation](#setup-and-installation)
- [Scripts](#scripts)
- [Usage](#usage)
- [Testing](#testing)

## Features

- **Automated Testing**: Integrated with Playwright for executing end-to-end tests.
- **React UI**: Built with React to showcase test cases in a modern, user-friendly interface.
- **Customizable and Extensible**: Easily adaptable to new test cases or test suites.

## Technologies

- **React**: Frontend framework for building a dynamic UI.
- **Playwright**: Automation framework for running end-to-end tests.
- **Node.js**: JavaScript runtime for backend and dependency management.

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/namnh663/qa-portfolio.git
   cd qa-portfolio
   ```

2. **Install dependencies**:
   Make sure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm start
   ```
   This will start the application at `http://localhost:3000` by default.

## Scripts

This project includes several npm scripts for development, testing, and building:

- **Start**: Runs the app in development mode.
  ```bash
  npm start
  ```
- **Test**: Launches the test runner.
  ```bash
  npm test
  ```
- **Build**: Builds the app for production.
  ```bash
  npm run build
  ```
- **Eject**: Removes the create-react-app build dependency, allowing custom configuration.
  ```bash
  npm run eject
  ```

## Usage

1. **Running the Application**:
   Open [http://localhost:3000](http://localhost:3000) to view the QA Portfolio in your browser.

2. **Adding Test Cases**:
   - New test cases can be added to the `tests` folder and should follow the project's testing conventions.
   - Integrate test cases within the Playwright framework to enable automated execution.

## Testing

This project includes end-to-end tests powered by Playwright:

- **Run Tests**:
  ```bash
  npx playwright test
  ```
- **Test Reporting**: Playwright generates detailed test reports, allowing you to track the status and performance of each test case.