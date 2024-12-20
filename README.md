# NexEvent

NexEvent is a platform for hosting and managing technical events. It leverages a Spring Boot backend with PostgreSQL as the database, a React (Vite and TypeScript) frontend, and Cloudinary for image storage.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Application Properties](#application-properties)
- [Running the Project](#running-the-project)


## Project Overview

**NexEvent** is a robust platform for hosting and managing technical events, built with Spring Boot for the backend, React (Vite and TypeScript) for the frontend, and PostgreSQL for database management. The platform leverages Cloudinary for efficient image storage and utilizes JWT-based authentication for secure user access. Designed with event organizers and participants in mind, **nexEvent** allows for easy event creation, management, and registration. It offers a seamless and secure experience, making it an ideal solution for technical events, all while ensuring efficient performance and scalability.



![Landing Page](https://github.com/user-attachments/assets/bda5aff8-1948-4306-a46a-e6786c063d72)


## Technologies Used
- **Backend**: Spring Boot
- **Frontend**: React with Vite and TypeScript
- **Database**: PostgreSQL
- **Image Storage**: Cloudinary
- **Authentication**: JWT (JSON Web Token)
- **Email Service**: Gmail SMTP

## Features
- User authentication (admin and regular users)
- Event creation and management
- Image upload and storage via Cloudinary
- JWT-based secure user sessions
- Event listing and registration

## Architecture

The project structure is divided into:
- `server`: The Spring Boot backend that handles API endpoints, authentication, and database operations.
- `client`: The React frontend (Vite with TypeScript) for user interaction and experience.
- `PostgreSQL Database`: Stores user, event, and related data.

## Installation

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/nexEvent.git
   cd nexEvent/server
   ```

2. **Configure Application Properties**:
   Update `application.properties` with your PostgreSQL credentials, JWT secret, and SMTP email settings.

3. **Build and Run**:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup

1. **Navigate to the client directory**:
   ```bash
   cd ../client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Add Environment Variables**:
   Update `.env` in the `client` directory with your Cloudinary credentials:
   ```dotenv
   VITE_CLOUDINARY_CLOUD_NAME=YourCloudName
   VITE_CLOUDINARY_API_KEY=YourAPIKey
   VITE_CLOUDINARY_API_SECRET=YourAPISecret
   VITE_CLOUDINARY_UPLOAD_PRESET=YourUploadPreset
   ```

## Environment Variables

### Frontend `.env` Configuration:
- `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `VITE_CLOUDINARY_API_KEY`: Your Cloudinary API key
- `VITE_CLOUDINARY_API_SECRET`: Your Cloudinary API secret
- `VITE_CLOUDINARY_UPLOAD_PRESET`: Cloudinary upload preset name

## Application-properties

### Backend `application.properties` Configuration:
```properties
spring.application.name=NexEvent
spring.datasource.url=jdbc:postgresql://localhost:5432/NexEvent
spring.datasource.username=postgres
spring.datasource.password=YourPassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8091
spring.security.user.name=admin
spring.security.user.password=yourpassword
security.jwt.secret-key=YourSecretKey
security.jwt.expiration-time=86400000
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=YourEmail@gmail.com
spring.mail.password=YourAppPassword
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

## Running the Project

1. **Start Backend**:
   ```bash
   cd server
   mvn spring-boot:run
   ```

2. **Start Frontend**:
   ```bash
   cd client
   npm run dev
   ```

Access the frontend at [http://localhost:3000](http://localhost:3000) and the backend at [http://localhost:8091](http://localhost:8091).


*If you have any queries, feel free to contact me!*


