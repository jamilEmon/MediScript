Project test video : https://drive.google.com/file/d/1F5SV0pt7HjBoHh4E8ujp-2MQacXxro7x/view?usp=drive_link
# MediScript Project Overview

This project, "MediScript," is a full-stack application designed for managing prescriptions. It consists of a Spring Boot backend and an Angular frontend. The backend handles prescription data management, user authentication, and potentially prescription generation. The frontend provides a user interface for various functionalities, including user login, a dashboard, prescription forms, viewing prescriptions, and reports.

## Project Structure

```
.
├── .gitignore
├── backend/
│   ├── .gitattributes
│   ├── .gitignore
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   ├── prescription-generator.zip
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── cmedhealth/
│   │   │   │           ├── mediscript/
│   │   │   │           │   ├── MediScriptApplication.java
│   │   │   │           │   ├── Prescription.java
│   │   │   │           │   ├── PrescriptionController.java
│   │   │   │           │   ├── PrescriptionRepository.java
│   │   │   │           │   ├── PrescriptionService.java
│   │   │   │           │   └── SecurityConfig.java
│   │   │   │           └── prescriptiongenerator/
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── data.sql
│   │   │       ├── static/
│   │   │       └── templates/
│   │   └── test/
│   │       └── java/
│   │           └── com/
│   │               └── cmedhealth/
│   │                   ├── mediscript/
│   │                   │   └── MediScriptApplicationTests.java
│   │                   └── prescriptiongenerator/
│   └── target/
└── frontend/
    ├── .gitignore
    ├── angular.json
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    └── src/
        ├── global_styles.css
        ├── index.html
        ├── main.ts
        └── app/
            ├── app.routes.ts
            ├── components/
            │   ├── dashboard.component.ts
            │   ├── layout.component.ts
            │   ├── login.component.ts
            │   ├── prescription-form.component.ts
            │   ├── prescriptions.component.ts
            │   ├── reports.component.ts
            │   └── toast.component.ts
            ├── guards/
            │   └── auth.guard.ts
            ├── interceptors/
            │   └── auth.interceptor.ts
            └── services/
                ├── auth.service.ts
                ├── prescription.service.ts
                └── toast.service.ts
```

## How the Project Works (Architectural Diagram Description)

The MediScript project follows a client-server architecture, separating the user interface (frontend) from the business logic and data storage (backend).

### Components:

1.  **Frontend (Angular Application)**:
    *   **User Interface**: Provides all the interactive elements for users, including login forms, dashboards, prescription entry forms, and report views.
    *   **Services**: Interacts with the backend API to send and retrieve data (e.g., `AuthService` for authentication, `PrescriptionService` for prescription management).
    *   **Components**: Modular UI elements like `LoginComponent`, `DashboardComponent`, `PrescriptionFormComponent`, `PrescriptionsComponent`, `ReportsComponent`, and `ToastComponent`.
    *   **Guards & Interceptors**: `AuthGuard` protects routes, ensuring only authenticated users can access certain parts of the application. `AuthInterceptor` automatically adds authentication tokens to outgoing HTTP requests.

2.  **Backend (Spring Boot Application)**:
    *   **RESTful API**: Exposes endpoints for the frontend to interact with, handling requests for user authentication, prescription creation, retrieval, updates, and deletion.
    *   **Controllers**: (`PrescriptionController`) Handles incoming HTTP requests, processes them, and returns appropriate responses.
    *   **Services**: (`PrescriptionService`) Contains the business logic for managing prescriptions, interacting with the repository layer.
    *   **Repositories**: (`PrescriptionRepository`) Manages data persistence, interacting with the database (e.g., H2 database as configured in `application.properties` and `data.sql`).
    *   **Security**: (`SecurityConfig`) Configures Spring Security for user authentication and authorization, protecting backend endpoints.
    *   **Models**: (`Prescription`) Defines the data structure for prescriptions.

### Workflow:

1.  **User Access**: A user accesses the frontend Angular application through a web browser.
2.  **Authentication**:
    *   The user attempts to log in via the `LoginComponent`.
    *   The `AuthService` sends login credentials to the backend's authentication endpoint.
    *   The backend's `SecurityConfig` and related components authenticate the user.
    *   Upon successful authentication, the backend returns an authentication token (e.g., JWT).
    *   The frontend stores this token and uses the `AuthInterceptor` to attach it to subsequent requests.
3.  **Data Interaction**:
    *   Authenticated users can navigate to different sections (e.g., Dashboard, Prescription Form, Prescriptions List, Reports).
    *   When a user performs an action (e.g., submitting a prescription form via `PrescriptionFormComponent`), the relevant frontend service (`PrescriptionService`) sends an HTTP request to the backend's `PrescriptionController`.
    *   The `PrescriptionController` delegates the request to the `PrescriptionService` (backend), which then interacts with the `PrescriptionRepository` to perform database operations (e.g., save, retrieve, update, delete prescriptions).
    *   The backend processes the request, interacts with the database, and sends a response back to the frontend.
    *   The frontend updates its UI based on the backend's response.
4.  **Reporting**: The `ReportsComponent` can fetch aggregated data from the backend to display various reports related to prescriptions.

This architecture ensures a clear separation of concerns, making the application scalable, maintainable, and easier to develop.
<<<<<<< HEAD

## Architectural Diagram (Text-based)
<img width="1924" height="4110" alt="image" src="https://github.com/user-attachments/assets/b3c2b00e-57f5-40fd-b6c4-1971521192e6" />
