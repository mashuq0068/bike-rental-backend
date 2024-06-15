# Bike Rental Backend

## Overview

**Bike Rental Backend** is a backend service for a bike rental system. It provides APIs to manage bike rentals, user authentication, and data management. The backend is built using Node.js, Express, and MongoDB, and is written in TypeScript.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Deployment](#deployment)

## Installation

To get started with the Bike Rental Backend, you need to have Node.js and npm installed on your machine. Follow the steps below to set up the project:

1. Clone the repository:

```bash
  git clone https://github.com/yourusername/bike-rental-backend.git
```

2. Navigate to the project directory:

```bash
   cd bike-rental-backend
```

3. Install the dependencies:

```bash
   npm install
```

## Scripts

### `build`

Compile the TypeScript code to JavaScript.

```bash
npm run build
```

### `start`

Start the server using the compiled JavaScript code..

```bash
npm run start
```

### `start:dev`

Start the server in development mode with automatic restarts on file changes.

```bash
npm run start:dev
```

### `start:prod`

Start the server in production mode using nodemon.

```bash
npm run start:prod
```

### `lint`

Run ESLint to check for linting errors.

```bash
npm run lint
```

### `lint:fix`

Run ESLint and automatically fix linting errors.

```bash
npm run lint:fix
```

### `prettier`

Format the code using Prettier.

```bash
npm run prettier
```

### `prettier:fix`

Format the code and automatically fix formatting issues using Prettier.

```bash
npm run prettier:fix
```

### `test`

Run the test suite.

```bash
npm run test
```

## Dependencies

The project relies on the following dependencies:

- **@types/bcrypt**: ^5.0.2
- **@types/jsonwebtoken**: ^9.0.6
- **bcrypt**: ^5.1.1
- **cors**: ^2.8.5
- **dotenv**: ^16.4.5
- **express**: ^4.19.2
- **http-status**: ^1.7.4
- **jsonwebtoken**: ^9.0.2
- **mongoose**: ^8.4.1
- **mongose**: ^0.0.2-security
- **zod**: ^3.23.8

## Dev Dependencies

The project also includes the following development dependencies:

- **@eslint/js**: ^9.4.0
- **@types/cors**: ^2.8.17
- **@types/express**: ^4.17.21
- **@typescript-eslint/eslint-plugin**: ^7.13.0
- **@typescript-eslint/parser**: ^7.13.0
- **eslint**: ^8.57.0
- **eslint-config-prettier**: ^9.1.0
- **globals**: ^15.4.0
- **prettier**: ^3.3.2
- **typescript**: ^5.4.5
- **typescript-eslint**: ^7.13.0

## Deployment

- Live Link: [Bike-rental project live link](https://bike-rental-backend-six.vercel.app/)
