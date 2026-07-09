# Bademjoon Backend Documentaion

Backend REST API for the **Bademjoon** nutrition tracking application.

Built with:

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- Joi Validation
- bcrypt Password Hashing

## Table of Contents

- Backend Overview
- Technology Stack
- Backend Structure
- Folder Explanation
- Installation
- Running the Server
- API Health Check
- Database
- Authentication
- Models
- API Reference
- Utility Scripts
- Future Improvements

## Backend Overview

The backend provides a RESTful API for managing:

- User authentication
- User accounts
- Food database
- Daily food logs (model ready)

Authentication is implemented using JWT.

Passwords are never stored as plain text and are hashed using **bcrypt** before being saved.

The application uses Sequelize as its ORM with a MySQL database.

## Technology Stack

| Technology | Purpose |
| ------------ | ---------- |
| Node.js | Runtime |
| Express | HTTP Server |
| Sequelize | ORM |
| MySQL | Database |
| JWT | Authentication |
| bcrypt | Password hashing |
| Joi | Input validation |
| Helmet | Security headers |
| CORS | Cross-origin requests |
| dotenv | Environment configuration |

## Backend Structure

### Backend Map

```plaintext
backend/
│
├── database/
│   └── db.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── models/
│   ├── associations.js
│   ├── dailylog.js
│   ├── food.js
│   └── user.js
│
├── routes/
│   ├── authRoutes.js
│   ├── foodsRoutes.js
│   └── usersRoutes.js
│
├── scripts/
│   ├── create_admin_user.py
│   ├── create_mock_users.py
│   ├── load_foods.py
│   └── foods.json
│
├── .env.example
├── package.json
├── package-lock.json
├── BACKEND_DOCUMENTATION.md
└── server.js
```

### Folder Explanation

- `database/` : Contains the Sequelize database connection.

- `middlewares/` : Contains reusable Express middleware.
  - JWT Authentication Middleware

- `models/` : Contains Sequelize models representing database tables.
  - User
  - Food
  - DailyLog
  - Also contains model relationships in `associations.js`.

- `routes/` : Contains REST API endpoints.
  - Authentication routes
  - Food routes
  - User routes

- `scripts/` : Python helper scripts used to populate the database.
  - Create admin account
  - Create test users
  - Import food dataset

## Installation

Clone the repository.

```bash
git clone https://github.com/BazarganDev/Bademjoon.git

cd backend
```

Install dependencies.

```bash
npm install
```

Create your environment variables file.

```bash
cp .env.example .env
```

Edit the variables inside `.env`.

### Environment Variables

```env
# Server Config
DB_HOST=
DB_USER=
DB_NAME=
DB_PASSWORD=

# JWT Config
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### Database Variables

| Variable | Description |
| ----------- | ------------- |
| DB_HOST | MySQL host |
| DB_USER | MySQL username |
| DB_NAME | Database name |
| DB_PASSWORD | Database password |

### JWT Variables

| Variable | Description |
| ----------- | ------------- |
| JWT_SECRET | Secret used to sign tokens |
| JWT_EXPIRES_IN | Token lifetime |

Default expiration: `7 days`

## Running the Server

Development mode:

```bash
npm run dev
```

The API starts on `localhost` port `5000`.

```plaintext
http://localhost:5000
```

## Server Startup

During startup the server:

1. Loads environment variables
2. Creates Express app
3. Enables JSON parsing
4. Enables Helmet
5. Enables CORS
6. Registers routes
7. Synchronizes Sequelize models
8. Starts listening on port 5000

## CORS

Currently allowed origins:

```plaintext
http://localhost:5500

http://127.0.0.1:5500
```

These are intended for development using VS Code Live Server.

## Security

Helmet is enabled.

Helmet automatically adds several HTTP security headers.

Passwords are hashed using bcrypt before storage.

Authentication uses JWT Bearer Tokens.

## Health Endpoint

```http
GET /health
```

Response:

```json
{
    "status":"OK",
    "message":"✅ Healthy",
    "timestamp":"..."
}
```

This endpoint can be used by load balancers, deployment services or monitoring tools to verify that the API is running.

## Database

The backend uses:

- MySQL
- Sequelize ORM

Connection configuration is located in:

```bash
database/db.js
```

Logging is disabled.

```js
logging: false
```

Database synchronization is performed automatically with `await database.sync();` when the server starts.

## Authentication Overview

Authentication is stateless.

After a successful login or registration, the server returns a JWT.

Example:

```json
{
    "token":"<jwt>"
}
```

The client must send the token with every protected request.

```http
Authorization: Bearer <token>
```

The middleware verifies the token before allowing access to protected routes.

If verification fails, the server returns `401 Unauthorized`.

## Models

The backend defines three Sequelize models:

- User
- Food
- DailyLog

These models are synchronized automatically with the MySQL database when the server starts.

## Entity Relationship Diagram

```plaintext
                 User
                  │
                  │ 1
                  │
                  │
                  ▼
             DailyLog
                  ▲
                  │
                  │ 1
                  │
                 Food
```

The implemented Sequelize relationships are:

```js
User.hasMany(DailyLog, { foreignKey: "user_id" });

Food.hasMany(DailyLog, { foreignKey: "food_id" });

DailyLog.belongsTo(User, { foreignKey: "user_id" });

DailyLog.belongsTo(Food, { foreignKey: "food_id" });
```

Although the comments mention a "many-to-many" relationship, the implementation uses **DailyLog** as a junction table between **User** and **Food**.

Relationship summary:

- One User can have many Daily Logs.
- One Food can appear in many Daily Logs.
- Each Daily Log belongs to exactly one User.
- Each Daily Log belongs to exactly one Food.

## User Model

Database table `users`:

| Field | Type | Required | Description |
| ------ | ------ | ---------- | ------------- |
| user_id | Integer | Yes | Primary key (Auto Increment) |
| first_name | String | Yes | User's first name |
| last_name | String | Yes | User's last name |
| mobile | String | Yes | Unique mobile number |
| username | String | Yes | Username |
| email | String | Yes | Unique email address |
| password | String | Yes | Hashed password |
| role | String | Yes | User role (Default: `user`) |

## Validation

- Email must be a valid email address.
- Mobile number must be unique.
- Email must be unique.

## User Data Security

Passwords are hashed using **bcrypt** before being stored.

Passwords are never returned in API responses.

## Food Model

Database table `foods`:

| Field | Type |
| ------ | ------ |
| food_id | Integer |
| food_name | String |
| category | String |
| calories_per_100 | Float |
| protein_g_per_100 | Float |
| carbs_g_per_100 | Float |
| fat_g_per_100 | Float |
| sodium_mg_per_100 | Float |
| sugar_g_per_100 | Float |
| fiber_g_per_100 | Float |
| cholesterol_mg_per_100 | Float |
| calcium_mg_per_100 | Float |
| iron_mg_per_100 | Float |
| potassium_mg_per_100 | Float |
| phosphorus_mg_per_100 | Float |

## Unique Constraint

Food names must be unique.

## Soft Delete

The Food model uses Sequelize's **Paranoid Mode**.

```js
paranoid: true
```

Deleting a food does **not** permanently remove it from the database.

Instead, Sequelize sets a `deletedAt` timestamp.

Deleted foods can later be restored using the dedicated restore endpoint.

## DailyLog Model

Database table `daily_logs`:

| Field | Type | Description |
| ------ | ------ | ------------- |
| log_id | Integer | Primary key |
| user_id | Integer | References User |
| food_id | Integer | References Food |
| amount_grams | Float | Amount consumed |
| meal | Enum | Meal type |
| log_date | Date | Consumption date |

Allowed meal types:

```plaintext
breakfast
lunch
dinner
snack
```

At the current stage of development, the model exists but no REST endpoints have been implemented for Daily Logs.

## Database Synchronization

The database is synchronized automatically when the server starts.

```js
await database.sync();
```

Sequelize creates any missing tables automatically.

---

## Authentication

Authentication is implemented using **JSON Web Tokens (JWT).**

A JWT is generated when a user:

- Registers
- Logs in

The client must include the JWT in every protected request.

Example:

```http
Authorization: Bearer <jwt_token>
```

---

## JWT Payload

The generated token contains the following user information:

```json
{
    "id": "<USER_ID>",
    "first_name": "<USER_FIRSTNAME>",
    "last_name": "<USER_LASTNAME>",
    "mobile": "<USER_MOBILE>",
    "username": "<USER_USERNAME>",
    "email": "<USER_EMAIL>",
    "role": "user"
}
```

The token lifetime is configured using:

```env
JWT_EXPIRES_IN=7d
```

If this variable is omitted, the backend defaults to **7 days**.

## Authentication Middleware

Protected routes use the `verifyToken` middleware.

The middleware performs the following steps:

1. Reads the `Authorization` header.
2. Verifies that it starts with `Bearer`.
3. Extracts the JWT.
4. Verifies the token using `JWT_SECRET`.
5. Decodes the payload.
6. Stores the decoded payload in `req.user`.
7. Passes control to the next middleware.

## Successful Authentication Flow

```plaintext
Client
   │
   │  Authorization: Bearer <token>
   ▼
verifyToken()
   │
   ▼
jwt.verify()
   │
   ▼
req.user
   │
   ▼
Protected Route
```

## Failed Authentication

If no token is provided:

```json
{
    "success": false,
    "message": "No token provided."
}
```

Status Code:

```http
401 Unauthorized
```

If the token is invalid or expired:

```json
{
    "success": false,
    "message": "Invalid or expired token."
}
```

Status Code:

```http
401 Unauthorized
```

## Protected Routes

All endpoints under the following route groups require a valid JWT:

```http
/foods
/users
```

The following endpoints are public:

```http
GET /health
POST /auth/register
POST /auth/login
POST /auth/logout
```

## Request Lifecycle

Every authenticated request follows this general flow:

```text
Client
   │
   ▼
Express Router
   │
   ▼
verifyToken()
   │
   ├── Invalid Token → 401
   │
   ▼
Route Handler
   │
   ▼
Joi Validation
   │
   ▼
Sequelize
   │
   ▼
MySQL
   │
   ▼
JSON Response
```

This separation of responsibilities keeps the codebase modular and easy to maintain.

## API Reference

Base URL:

```http
http://localhost:5000
```

Unless otherwise specified, all request and response bodies are JSON.

## Authentication API

Authentication endpoints are responsible for:

- Registering new users
- Logging users in
- Logging users out

Authentication uses **JWT**.

After a successful login or registration, the server returns a JWT that must be included in future requests to protected endpoints.

Example:

```http
Authorization: Bearer <jwt_token>
```

## Register User

Creates a new user account.

### Endpoint

```http
POST /auth/register
```

Authentication Required: `NO`

### Request Body

```json
{
    "first_name": "John",
    "last_name": "Doe",
    "mobile": "09123456789",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "123456",
    "role": "user"
}
```

### Validation Rules

| Field | Required | Validation |
| -------- | ---------- | ------------ |
| first_name | Yes | String |
| last_name | Yes | String |
| mobile | Yes | String, exactly 11 characters |
| username | Yes | String |
| email | Yes | Valid email |
| password | Yes | String |
| role | No | String |

### Successful Response

Status Code

```http
201 Created
```

Example response:

```json
{
    "success": true,
    "message": "User registered successfully.",
    "token": "<jwt_token>",
    "user": {
        "user_id": "<USER_ID>",
        "first_name": "John",
        "last_name": "Doe",
        "mobile": "09123456789",
        "username": "johndoe",
        "email": "john@example.com",
        "role": "user"
    }
}
```

The password is **never** included in the response.

### Possible Errors

#### Invalid Request

```http
400 Bad Request
```

Returned when Joi validation fails.

Examples:

- Missing required field
- Invalid email
- Invalid mobile number

#### Mobile Already Registered

```http
409 Conflict
```

Example:

```json
{
    "success": false,
    "message": "This mobile number is already registered!"
}
```

#### Database Error

```http
400 Bad Request
```

Returned when Sequelize cannot create the user.

## Login

Authenticates an existing user.

### Login Endpoint

```http
POST /auth/login
```

Authentication Required: `NO`

### Request Body

```json
{
    "email": "john@example.com",
    "password": "123456"
}
```

### Required Fields

| Field | Required |
| -------- | ---------- |
| email | Yes |
| password | Yes |

### Successful Response

Status Code

```http
200 OK
```

Example:

```json
{
    "success": true,
    "message": "User logged in.",
    "token": "<jwt_token>",
    "user": {
        "user_id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "mobile": "09123456789",
        "username": "johndoe",
        "email": "john@example.com",
        "role": "user"
    }
}
```

Again, the password field is excluded from the response.

### Possible Errors

#### Missing Credentials

```http
400 Bad Request
```

Example:

```json
{
    "success": false,
    "message": "Please fill up email address and password fields."
}
```

#### Invalid Credentials

```http
401 Unauthorized
```

Returned when:

- Email does not exist.
- Password is incorrect.

Example:

```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

## Logout

Logs the current user out.

### Endpoint

```http
POST /auth/logout
```

Authentication Required : `NO`

### Description

The backend currently implements a **stateless authentication system**.

No JWT blacklist or server-side session storage exists.

Logging out simply informs the client that logout was successful.

The client application is responsible for removing the stored JWT.

### Successful Response

Status Code

```http
200 OK
```

Example:

```json
{
    "success": true,
    "message": "User logged out."
}
```

## Authentication Flow

```plaintext
Register
    │
    ▼
JWT Generated
    │
    ▼
Client Stores Token
    │
    ▼
Authorization: Bearer <token>
    │
    ▼
Protected Endpoint
    │
    ▼
verifyToken()
    │
    ▼
Route Handler
```

## JWT Usage Example

Example request to a protected endpoint:

```http
GET /foods?page=1 HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Without the `Authorization` header, protected endpoints return:

```http
401 Unauthorized
```

## Authentication Summary

| Endpoint | Method | Authentication |
| ---------- | -------- | ---------------- |
| /auth/register | POST | Public |
| /auth/login | POST | Public |
| /auth/logout | POST | Public (Current Implementation) |

## Users API

The Users API provides endpoints for retrieving, updating, and deleting user accounts.

All endpoints in this section require a valid JWT.

Include the token in the request header:

```http
Authorization: Bearer <jwt_token>
```

### Get All Users

Returns a list of all registered users.

### Endpoint

```http
GET /users
```

Authentication Required : `Yes`

### Headers

```http
Authorization: Bearer <jwt_token>
```

### Successful Response

Status Code

```http
200 OK
```

Example:

```json
[
    {
        "user_id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "mobile": "09123456789",
        "username": "johndoe",
        "email": "john@example.com",
        "role": "admin"
    },
    {
        "user_id": 2,
        "first_name": "Jane",
        "last_name": "Smith",
        "mobile": "09111111111",
        "username": "janesmith",
        "email": "jane@example.com",
        "role": "user"
    }
]
```

Passwords are excluded from the response.

### ⚠️ Notes

The source code comments indicate that this endpoint is intended for administrators.

However, the current implementation only verifies that the request contains a valid JWT. No role-based authorization is performed.

### Get User by ID

Returns information for a specific user.

### Endpoint

```http
GET /users/:id
```

Authentication Required : `Yes`

### Path Parameters

| Parameter | Type | Description |
| ----------- | ------ | ------------- |
| id | Integer | User ID |

Example:

```http
GET /users/5
```

### Successful Response

Status Code

```http
200 OK
```

Example:

```json
{
    "success": true,
    "user": {
        "user_id": 5,
        "first_name": "John",
        "last_name": "Doe",
        "mobile": "09123456789",
        "username": "johndoe",
        "email": "john@example.com",
        "role": "user"
    }
}
```

The password is removed before returning the user object.

### User Not Found

Status Code

```http
404 Not Found
```

Example:

```json
{
    "success": false,
    "message": "User not found!"
}
```

### ⚠️ Notes

The comments in the source code state that this endpoint is intended for authenticated users viewing their own profile.

The current implementation does not verify ownership, so any authenticated user can request any user by ID.

### Update User

Updates one or more fields of an existing user.

### Endpoint

```http
PUT /users/:id
```

Authentication Required : `Yes`

### Path Parameters

| Parameter | Type | Description |
| ----------- | ------ | ------------- |
| id | Integer | User ID |

### Request Body

All fields are optional.

```json
{
    "first_name": "John",
    "last_name": "Doe",
    "username": "johnny",
    "mobile": "09123456789",
    "email": "john@example.com",
    "password": "newPassword123",
    "role": "admin"
}
```

### Validation Rules

| Field | Validation |
| -------- | ------------ |
| first_name | String |
| last_name | String |
| username | String |
| mobile | String (11 characters) |
| email | Valid email |
| password | String |
| role | String |

### Password Updates

If a new password is provided, it is automatically hashed before being stored.

Example:

```js
if (value.password) {
    value.password = await bcrypt.hash(newPassword, 10);
}
```

The plain-text password is never stored in the database.

### Successful Response

Status Code

```http
200 OK
```

Example:

```json
{
    "success": true,
    "message": "User has been edited!",
    "user": {
        "user_id": 5,
        "first_name": "John",
        "last_name": "Doe",
        "mobile": "09123456789",
        "username": "johnny",
        "email": "john@example.com",
        "role": "user"
    }
}
```

### Validation Error

Status Code

```http
400 Bad Request
```

Returned when the submitted data does not satisfy the Joi schema.

### User Not Found

Status Code

```http
404 Not Found
```

Example:

```json
{
    "success": false,
    "message": "User not found!"
}
```

### Delete User

Deletes a user account.

### Endpoint

```http
DELETE /users/:id
```

Authentication Required : `Yes`

### Path Parameters

| Parameter | Type | Description |
| ----------- | ------ | ------------- |
| id | Integer | User ID |

### Successful Response

Status Code

```http
201 Created
```

Example:

```json
{
    "success": true,
    "message": "User has been deleted!",
    "user": {
        "user_id": 5,
        "first_name": "John",
        "last_name": "Doe",
        "mobile": "09123456789",
        "username": "johnny",
        "email": "john@example.com",
        "role": "user"
    }
}
```

The deleted user's password is removed before the response is returned.

### User Not Found

Status Code

```http
404 Not Found
```

Example:

```json
{
    "success": false,
    "message": "User not found!"
}
```

### ⚠️ Authorization Notes

The current implementation verifies only that the request contains a valid JWT.

Role-based authorization is **not** enforced.

For example:

- Any authenticated user can retrieve all users.
- Any authenticated user can retrieve another user's profile.
- Any authenticated user can update another user's account.
- Any authenticated user can delete another user's account.

If role-based access control is required, additional authorization checks should be implemented (for example, by validating `req.user.role` or comparing `req.user.id` with the requested user ID).

### Users API Summary

| Method | Endpoint | Description | Authentication |
| -------- | ---------- | ------------- | ---------------- |
| GET | `/users` | Get all users | Required |
| GET | `/users/:id` | Get a user by ID | Required |
| PUT | `/users/:id` | Update a user | Required |
| DELETE | `/users/:id` | Delete a user | Required |

## Foods API

The Foods API provides endpoints for managing the food database.

All endpoints in this section require a valid JWT.

Include the access token in the request header.

```http
Authorization: Bearer <jwt_token>
```

### Get Foods

Returns a paginated list of foods.

### Endpoint

```http
GET /foods
```

Authentication Required : `Yes`

### Query Parameters

| Parameter | Type | Required | Description |
| ----------- | ------ | ---------- | ------------- |
| page | Integer | No | Page number (Default: 1) |
| foodName | String | No | Search by food name |
| category | String | No | Search by category |

All query parameters are optional.

### Example Requests

Get the first page:

```http
GET /foods
```

Get the second page:

```http
GET /foods?page=2
```

Search by food name:

```http
GET /foods?foodName=موز
```

Search by category:

```http
GET /foods?category=fruit
```

Search by both:

```http
GET /foods?foodName=کوبیده&category=food
```

### Pagination

The backend returns **20 food items per page**.

Internally:

```js
const limit = 20;
```

The response includes pagination metadata.

### Successful Response

Status Code

```http
200 OK
```

Example:

```json
{
    "page": 1,
    "totalPages": 25,
    "pageItems": 20,
    "total": 489,
    "foods": [
        {
            "food_id": 1,
            "food_name": "<FOOD_NAME>",
            "category": "<CATEGORY>",
            "calories_per_100": 165,
            "protein_g_per_100": 31,
            "carbs_g_per_100": 0,
            "fat_g_per_100": 3.6,
            "sodium_mg_per_100": 74,
            "sugar_g_per_100": 0,
            "fiber_g_per_100": 0,
            "cholesterol_mg_per_100": 85,
            "calcium_mg_per_100": 15,
            "iron_mg_per_100": 1,
            "potassium_mg_per_100": 256,
            "phosphorus_mg_per_100": 220
        }
    ]
}
```

### Get Food by ID

Returns a single food item.

### Endpoint

```http
GET /foods/:id
```

Authentication Required : `Yes`

### Path Parameters

| Parameter | Type | Description |
| ----------- | ------ | ------------- |
| id | Integer | Food ID |

Example:

```http
GET /foods/15
```

### Successful Response

Status Code

```http
200 OK
```

Example:

```json
{
    "success": true,
    "food": {
        "food_id": 15,
        "food_name": "<FOOD_NAME>",
        "category": "<CATEGORY>",
        "calories_per_100": 52,
        "protein_g_per_100": 0.3,
        "carbs_g_per_100": 14,
        "fat_g_per_100": 0.2,
        "sodium_mg_per_100": 1,
        "sugar_g_per_100": 10.4,
        "fiber_g_per_100": 2.4,
        "cholesterol_mg_per_100": 0,
        "calcium_mg_per_100": 6,
        "iron_mg_per_100": 0.1,
        "potassium_mg_per_100": 107,
        "phosphorus_mg_per_100": 11
    }
}
```

### Food Not Found

Status Code

```http
404 Not Found
```

Example:

```json
{
    "success": false,
    "message": "Food not found!"
}
```

### Create Food

Creates a new food item.

### Endpoint

```http
POST /foods
```

Authentication Required : `Yes`

### Request Body

```json
{
    "food_name": "Apple",
    "category": "Fruit",
    "calories_per_100": 52,
    "protein_g_per_100": 0.3,
    "carbs_g_per_100": 14,
    "fat_g_per_100": 0.2,
    "sodium_mg_per_100": 1,
    "sugar_g_per_100": 10.4,
    "fiber_g_per_100": 2.4,
    "cholesterol_mg_per_100": 0,
    "calcium_mg_per_100": 6,
    "iron_mg_per_100": 0.1,
    "potassium_mg_per_100": 107,
    "phosphorus_mg_per_100": 11
}
```

### Validation

All fields are required.

| Field | Type |
| ------ | ------ |
| food_name | String |
| category | String |
| calories_per_100 | Number |
| protein_g_per_100 | Number |
| carbs_g_per_100 | Number |
| fat_g_per_100 | Number |
| sodium_mg_per_100 | Number |
| sugar_g_per_100 | Number |
| fiber_g_per_100 | Number |
| cholesterol_mg_per_100 | Number |
| calcium_mg_per_100 | Number |
| iron_mg_per_100 | Number |
| potassium_mg_per_100 | Number |
| phosphorus_mg_per_100 | Number |

### Successful Response

Status Code

```http
201 Created
```

Returns the newly created food object.

### Duplicate Food

Status Code

```http
409 Conflict
```

Example:

```json
{
    "success": false,
    "message": "This food item already exists in the database!"
}
```

### Update Food

Updates one or more properties of a food item.

### Endpoint

```http
PUT /foods/:id
```

Authentication Required : `Yes`

### Path Parameters

| Parameter | Type |
| ----------- | ------ |
| id | Integer |

### Request Body

All fields are optional.

Only the supplied fields are updated.

Example:

```json
{
    "calories_per_100": 210,
    "protein_g_per_100": 32
}
```

### Successful Response

Status Code

```http
200 OK
```

Example:

```json
{
    "success": true,
    "message": "Food has been edited.",
    "food": {
        "...": "..."
    }
}
```

### Food Not Found

Status Code

```http
404 Not Found
```

Example:

```json
{
    "success": false,
    "message": "Food not found!"
}
```

### Delete Food

Deletes a food item.

### Endpoint

```http
DELETE /foods/:id
```

Authentication Required : `Yes`

### Soft Delete

Foods are **soft deleted**.

The record remains in the database but receives a `deletedAt` timestamp.

### Successful Response

Status Code

```http
204 No Content
```

Current implementation returns:

```json
{
    "success": true,
    "message": "Food with ID number 15 deleted successfully."
}
```

> **Note:** According to the HTTP specification, a `204 No Content` response should not include a response body. If a JSON response is intended, returning `200 OK` would be more conventional.

### Food Not Found

Status Code

```http
404 Not Found
```

### Restore Food

Restores a previously soft-deleted food.

### Endpoint

```http
PUT /foods/:id/undo
```

Authentication Required : `Yes`

### Successful Response

Status Code

```http
200 OK
```

Example:

```json
{
    "success": true,
    "message": "Food with ID number 15 restored successfully."
}
```

### Possible Errors

Food not found:

```json
{
    "success": false,
    "message": "Food not found!"
}
```

Food is not deleted:

```json
{
    "success": false,
    "message": "Food is not deleted!"
}
```

Both return:

```http
404 Not Found
```

### Foods API Summary

| Method | Endpoint | Description | Authentication |
| -------- | ---------- | ------------- | ---------------- |
| GET | `/foods` | List foods (paginated) | Required |
| GET | `/foods/:id` | Get food by ID | Required |
| POST | `/foods` | Create food | Required |
| PUT | `/foods/:id` | Update food | Required |
| DELETE | `/foods/:id` | Soft delete food | Required |
| PUT | `/foods/:id/undo` | Restore soft-deleted food | Required |

### Search and Pagination Summary

| Feature | Supported |
| --------- | ----------- |
| Pagination | ✅ |
| Search by food name | ✅ |
| Search by category | ✅ |
| Combined search | ✅ |
| Soft delete | ✅ |
| Restore deleted food | ✅ |

## Utility Scripts

The `scripts/` directory contains helper scripts for bootstrapping and populating the application with sample data.

These scripts communicate with the REST API rather than interacting directly with the database, ensuring that all validation and business logic defined by the backend is applied.

```plaintext
scripts/
├── create_admin_user.py
├── create_mock_users.py
├── load_foods.py
└── foods.json
```

### create_admin_user.py

Creates an administrator account by sending a request to the registration endpoint.

### Endpoint Used

```http
POST /auth/register
```

### Default Administrator

```json
{
    "first_name": "Mohammad",
    "last_name": "Bazargan",
    "mobile": "09000000000",
    "username": "mammadbazargan",
    "email": "testadmin@yahoo.com",
    "password": "123456789",
    "role": "admin"
}
```

### Usage

Run the script after starting the backend server.

```bash
python scripts/create_admin_user.py
```

### create_mock_users.py

Creates a collection of sample users.

### Endpoint Used

```http
POST /auth/register
```

The script:

- Creates multiple users
- Sends one HTTP request per user
- Waits 0.5 seconds between requests
- Prints the result of each request

Example:

```bash
python scripts/create_mock_users.py
```

This script is useful for development and testing.

### load_foods.py

Imports food items from `foods.json`.

Unlike inserting data directly into MySQL, this script uses the REST API to create each food item.

This ensures:

- Input validation
- Authentication
- Duplicate checking
- Consistent application behavior

### Authentication

Before importing foods, the script logs in as the administrator.

```http
POST /auth/login
```

After a successful login, the returned JWT is included in subsequent requests.

Example header:

```http
Authorization: Bearer <jwt_token>
```

### Endpoint Used

```http
POST /foods
```

## Import Process

The script performs the following steps:

1. Opens `foods.json`
2. Reads every category
3. Flattens the dataset
4. Logs in as the administrator
5. Retrieves a JWT
6. Sends every food item to the backend
7. Prints the result
8. Displays a summary report

### Example Output

```text
✅ برنج سفید (پخته)
✅ کباب کوبیده
✅ سیب
❌ موز (<ERROR MESSAGE>)

Total number of food items loaded successfully: 3

Total number of food items failed: 1
```

### foods.json

Contains the food dataset used by `load_foods.py`.

Each item contains nutritional values per 100 grams.

Typical fields include:

- food_name
- category
- calories_per_100
- protein_g_per_100
- carbs_g_per_100
- fat_g_per_100
- sodium_mg_per_100
- sugar_g_per_100
- fiber_g_per_100
- cholesterol_mg_per_100
- calcium_mg_per_100
- iron_mg_per_100
- potassium_mg_per_100
- phosphorus_mg_per_100

## Initial Setup Workflow

For a fresh installation, the recommended setup order is:

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file based on `.env.example`.

### 3. Start the backend

```bash
npm run dev
```

### 4. Create the administrator

```bash
python scripts/create_admin_user.py
```

### 5. Import the food database

```bash
python scripts/load_foods.py
```

### 6. (Optional) Generate sample users

```bash
python scripts/create_mock_users.py
```

## HTTP Status Codes

The backend commonly returns the following HTTP status codes.

| Status | Meaning |
| --------- | ---------- |
| 200 | Request completed successfully |
| 201 | Resource created successfully |
| 204 | Resource deleted successfully (soft delete) |
| 400 | Validation error or bad request |
| 401 | Authentication failed |
| 404 | Resource not found |
| 409 | Resource already exists |

## Error Responses

Most endpoints return errors using the following structure.

```json
{
    "success": false,
    "message": "Error message"
}
```

Validation errors generated by Joi may instead return the validation message directly.

## Development Notes

### Password Security

Passwords are hashed using **bcrypt** before being stored.

Plain-text passwords are never saved to the database.

### Authentication

Authentication is implemented using JWT.

The backend does not maintain server-side sessions.

The client is responsible for storing and removing the JWT.

### Database

The backend uses Sequelize ORM with a MySQL database.

Tables are synchronized automatically during application startup.

### Soft Deletes

Food records are soft deleted using Sequelize's `paranoid` mode.

Deleted foods remain in the database and can be restored later.

### Validation

Incoming request data is validated using Joi before interacting with the database.

## Future Improvements

Potential improvements for future versions include:

- Role-based authorization
- DailyLog CRUD endpoints
- Refresh tokens
- Password reset functionality
- Email verification
- API versioning
- Request logging
- Rate limiting
- Unit and integration tests
- Docker support
- OpenAPI (Swagger) documentation
- CI/CD pipeline

## License

MIT
