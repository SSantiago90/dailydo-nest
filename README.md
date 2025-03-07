# DailyDo Backend

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

DailyDo is a task management application built with NestJS and React. This repository contains the backend implementation, which provides RESTful APIs for managing tasks, users, and authentication.

## Features

- User registration and authentication
- Task creation, reading, updating, and deletion
- Real-time updates via WebSockets
- Integration with MongoDB for data storage
- API documentation using Swagger

## Installation

To install the required dependencies, run:

bash npm install

For development purposes, you can use:

bash npm install --save-dev

## Configuration

Before running the application, you need to set up your environment variables. Create a `.env` file in the root directory with the following content:

PORT=3000 MONGO_URL=mongodb://localhost:27017/dailydo JWT_SECRET=your_secret_key_here

Adjust the values according to your needs.

## Usage

To start the application in development mode:

bash npm run start:dev

For production:

bash npm run start:prod

## API Documentation

The API documentation is available at `http://localhost:3000/api` after starting the server. You can explore the available endpoints and their parameters there.

## Testing

To run tests:

bash npm run test

For coverage report:

bash npm run test:cov

## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our development process, and the issue tracker for development priorities.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
