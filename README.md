### Part Of Microservice Grocery App

---

# Grocery Auth Service

This service is a part of a microservices-based architecture responsible for handling user authentication and authorization. It provides various endpoints for user sign-up, login, password resets, social login integrations, and more. Additionally, it integrates with a notification service to send emails for actions like password reset and account verification.

## Key Features

- **User Authentication:** Provides functionalities such as sign-up, login, password resets, and profile updates.
- **Social Authentication:** Supports OAuth login via providers like GitHub, Google, LinkedIn, and Twitter.
- **Token-Based Authorization:** Utilizes JWT for token-based authentication and role management.
- **Email Notifications:** Sends emails (for actions like password reset) by communicating with a notification service through RabbitMQ and HTTP requests.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [File Structure](#file-structure)
3. [Authentication Flow](#authentication-flow)
4. [Integration with Notification Service](#integration-with-notification-service)
5. [Running the Service](#running-the-service)
6. [Endpoints](#endpoints)
7. [Development](#development)

---

### Technologies Used

- **Node.js** with **NestJS** as the main framework.
- **TypeScript** for static typing.
- **JWT** (JSON Web Token) for user authentication.
- **RabbitMQ** for message queueing and asynchronous email notifications.
- **MySQL** as the database through TypeORM.
- **Passport.js** for OAuth and social login integrations (Google, GitHub, LinkedIn, and Twitter).
- **Winston** for logging.
- **Sentry** for error tracking.

### File Structure

```plaintext
.
|-- README.md        
|-- combined.log     
|-- debug.log        
|-- error.log        
|-- nest-cli.json    
|-- package-lock.json
|-- package.json
|-- postman-collection
|   `-- postman-collection-v1.json
|-- src
|   |-- app
|   |   |-- modules
|   |   |   |                               `-- api
|   |   |   |   |                           `-- api.module.ts
|   |   |   |   |                           `-- auth
|   |   |   |   |   |                       `-- auth.module.ts
|   |   |   |   |                           `-- controller
|   |   |   |   |                           `-- auth.controller.ts
|   |   |   |   `-- social-auth
|   |   |   |       |-- controller
|   |   |   |       |   |                   `-- github.controller.ts
|   |   |   |       |   |                   `-- gmail.controller.ts
|   |   |   |       |   |                   `-- linkedin.controller.ts
|   |   |   |       |                       `-- x.controller.ts
|   |   |   |       `-- social-login.module.ts
|   |   |   |-- application
|   |   |   |   |-- application.module.ts
|   |   |   |   |-- auth
|   |   |   |   |   |-- model
|   |   |   |   |   |   |                   `-- forget-password.dto.ts
|   |   |   |   |   |   |                   `-- login.dto.ts
|   |   |   |   |   |   |                   `-- o-auth.dto.ts
|   |   |   |   |   |   |                   `-- reset-password.dto.ts
|   |   |   |   |   |   |                   `-- signup.dto.ts
|   |   |   |   |   |                       `-- token.dto.ts
|   |   |   |   |   `-- services
|   |   |   |   |                           `-- auth.service.ts
|   |   |   |   |-- shared
|   |   |   |   `-- social-auth
|   |   |   |       `-- gmail
|   |   |   |           |                   `-- model
|   |   |   |           |                   `-- complete-user.dto.ts
|   |   |   |           `-- services
|   |   |   |                               `-- OAuth.service.ts
|   |   |   |-- database
|   |   |   |   |-- data-source.ts
|   |   |   |   |-- database.module.ts
|   |   |   |   `-- migrations
|   |   |   |       |-- 1729158705025-addUsersTable.ts
|   |   |   |       |-- 1729162035465-addIsActiveColumnToUsers.ts
|   |   |   |       |-- 1729176139822-addRefreshTookenAndStratgyKeyToUsersTable.ts
|   |   |   |       |-- 1729178691817-addIsCompletedToUserTable.ts
|   |   |   |       |-- 1729179326815-addProviderToUsersTable.ts
|   |   |   |       |-- 1729179555682-modifySchemaForUserTable.ts
|   |   |   |       |-- 1729179784097-modifySchemaForUserTable.ts
|   |   |   |       |-- 1729179900659-modifySchemaForUserTable.ts
|   |   |   |       |-- 1729181791971-modifySchemaForUserTable.ts
|   |   |   |       |-- 1729340456197-addOtpAndExpiryDateToUsersTable.ts
|   |   |   |       `-- 1729340786105-addIsVerifedColumnToUsersTable.ts
|   |   |   |-- infrastructure
|   |   |   |   |-- communicator
|   |   |   |   |   |-- communicator.module.ts
|   |   |   |   |   `-- notification.communicator.ts
|   |   |   |   |-- entities
|   |   |   |   |   `-- general
|   |   |   |   |       `-- user.entity.ts
|   |   |   |   |-- infrastructure.module.ts
|   |   |   |   |-- repositories
|   |   |   |   |   `-- auth
|   |   |   |   |       `-- auth.repository.ts
|   |   |   |   `-- sentry
|   |   |   |       `-- instrument.ts
|   |   |   `-- strategies
|   |   |       |-- X
|   |   |       |   `-- x.strategy.ts
|   |   |       |-- github
|   |   |       |   `-- github.strategy.ts
|   |   |       |-- gmail
|   |   |       |   `-- google.stratgy.ts
|   |   |       |-- jwt
|   |   |       |   |-- jwt.guard.ts
|   |   |       |   |-- jwt.service.ts
|   |   |       |   `-- jwt.strategy.ts
|   |   |       `-- linkedin
|   |   |           `-- linkedin.strategy.ts
|   |   |-- rabbitMQ
|   |   |   |-- connector.ts
|   |   |   |-- consumer-options.ts
|   |   |   |-- exchange.definition.ts
|   |   |   |-- queue-consumer.decorator.ts
|   |   |   |-- queue.difinition.ts
|   |   |   |-- rabbit-mq-consumer.ts
|   |   |   |-- rabbit-mq-publisher.ts
|   |   |   `-- rabbit-mq.module.ts
|   |   `-- shared
|   |       |-- interfaces
|   |       |   `-- IEnvConfigInterface.ts
|   |       |-- module
|   |       |   `-- config-module
|   |       |       |-- config.module.ts
|   |       |       `-- config.service.ts
|   |       `-- utils
|   |           |-- generator.helper.ts
|   |           `-- hash.helper.ts
|   |-- app.module.ts
|   `-- main.ts
|-- test
|   |-- app.e2e-spec.ts
|   `-- jest-e2e.json
|-- tsconfig.build.json
|-- tsconfig.json
`-- warn.log
```

### Authentication Flow

The service supports both traditional email-based authentication (sign-up/login) and OAuth-based authentication (GitHub, Google, LinkedIn, Twitter).

#### JWT Authentication
- **Sign-up**: Registers a new user and returns access and refresh tokens.
- **Login**: Logs in an existing user and provides tokens for session management.
- **Token Refresh**: Generates new access tokens using refresh tokens.
- **Profile Management**: Users can view and update their profiles while authenticated.

#### OAuth (Social Login)
- **GitHub, Google, LinkedIn, Twitter**: The service supports login via these social platforms using OAuth. Upon successful login, an access token is generated, and user details are stored in the database.

### Integration with Notification Service

The service is integrated with a **notification service** to send out email notifications for actions like:

- Password reset requests.
- Email verification.

#### Communication Mechanisms:
1. **RabbitMQ**: The primary method used for asynchronously sending email-related messages.
    - Messages related to email notifications are sent to a message queue (RabbitMQ), which the notification service listens to and processes.
2. **HTTP Calls**: Additionally, HTTP requests can be made directly to the notification service to trigger emails synchronously, providing a flexible alternative.

This dual communication approach allows for both synchronous and asynchronous notification handling.

### Running the Service

#### Prerequisites:
- Node.js
- MySQL
- RabbitMQ
- Docker (optional)

#### Steps:
1. Install dependencies:
    ```bash
    npm install
    ```
2. Setup environment variables (e.g., `.env`):
    ```plaintext
    DATABASE_URL=mysql://user:password@localhost:3306/auth_db
    RABBITMQ_URL=amqp://localhost
    JWT_SECRET=your_jwt_secret
    ```
3. Run the service:
    ```bash
    npm start
    ```

### Endpoints

Here are the main routes of the service:

#### Authentication (Email-based):
- **POST** `/auth/signup` - Register a new user.
- **POST** `/auth/login` - Login with email and password.
- **POST** `/auth/forgot-password` - Request a password reset link.
- **POST** `/auth/reset-password` - Reset password using a link sent to the email.
- **GET** `/auth/profile` - Retrieve the authenticated user's profile.

#### OAuth (Social Login):
- **GET** `/auth/google` - Google OAuth login.
- **GET** `/auth/github` - GitHub OAuth login.
- **GET** `/auth/linkedin` - LinkedIn OAuth login.
- **GET** `/auth/twitter` - Twitter OAuth login.

#### Email Notifications:
- **POST** `/auth/send-verification-email` - Request to send a verification email.
- **POST** `/auth/verify-email` - Verify email using an OTP sent to the user's email.

### Development

- **Testing**: Unit and e2e tests are set up using Jest.
    ```bash
    npm run test
    ```

- **Linting**: Ensure code quality with ESLint.
    ```bash
    npm run lint
    ```

---
