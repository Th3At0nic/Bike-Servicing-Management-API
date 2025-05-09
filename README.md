# Bike Servicing Management API 🏍️

## Overview

The Bike Servicing Management API is a backend system designed to handle customer and service records for a bike servicing center. The API supports managing customers, motorcycles (bikes), and service records through various CRUD operations. This solution aims to provide a seamless way to handle servicing requests, track job status, and store bike information for both customers and service center administrators.

---

### 💻 Live Deployment

You can access the live API at: [Your Live API Link Here]

## 🛠 Technologies

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **TypeScript**: JavaScript with type safety
- **Prisma ORM**: For database interaction and schema management
- **PostgreSQL**: Relational database to store customer, bike, and service data

---

## 📦 Features

- **Customer Management**: Create, update, fetch, and delete customer records.
- **Motorcycle Management**: Manage customer motorcycles including brand, model, and year.
- **Service Record Management**: Track the servicing status of bikes, including service descriptions and timestamps for each service.
- **Pending or Overdue Services**: Special endpoint to list services that are overdue or still pending for over a week.

---

## 🚀 Setup Guide

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Th3At0nic/Bike-Servicing-Management-API.git
cd Bike-Servicing-Management-API
```

### 2. Install Dependencies

bash
Copy
Edit
npm install

### 3. Configure the Database

Ensure that PostgreSQL is installed and running on your machine. Then, create a .env file in the root of the project and add your database connection string:

```
DATABASE_URL="postgresql://username:password@localhost:5432/bike_servicing_db?schema=public" 4. Apply Database Migrations
Use Prisma to set up the database schema:
```

```bash
npx prisma migrate dev --name init 5. Start the Server
```

```bash
npm run dev
```

Your API should now be running at http://localhost:5000.

### 📡 API Endpoints

Here are the key API routes available in the Bike Servicing Management System.

### Customer Management

POST /api/customers – Create a new customer.

GET /api/customers – Get all customers.

GET /api/customers/{customerId} – Get customer details by ID.

PUT /api/customers/{customerId} – Update customer details.

DELETE /api/customers/{customerId} – Delete a customer.

### Bike Management

POST /api/bikes – Add a new bike.

GET /api/bikes – Get all bikes.

GET /api/bikes/{bikeId} – Get bike details by ID.

### Service Management

POST /api/services – Create a service record for a bike.

GET /api/services – Get all service records.

GET /api/services/{serviceId} – Get a specific service record by ID.

PUT /api/services/{serviceId}/complete – Mark a service as completed.

Pending or Overdue Services
GET /api/services/status – Fetch services that are pending or overdue (older than 7 days).

### ✨ Key Features

Complete CRUD operations for customers, motorcycles, and service records.

Service Status Updates: Track the status of service records, including pending, in-progress, and completed states.

Overdue Services Endpoint: Automatically fetch services that are overdue for more than a week.

Standardized Error Handling: Clear and concise error responses across all endpoints.

### 📝 Example Requests

Create Customer

```bash
POST /api/customers
{
"name": "John Doe",
"email": "john.doe@example.com",
"phone": "123-456-7890"
}
```

### Create Motorcycle

```bash
POST /api/bikes
{
"brand": "Honda",
"model": "CBR1000RR",
"year": 2022,
"customerId": "87b3d7e1-8d9a-4f51-bf01-6f1e92f0f194"
}
```

### Create Service Record

```bash
POST /api/services
{
"bikeId": "f3f1b192-3e62-402e-9bd3-d351a5a10e92",
"serviceDate": "2025-04-11T10:00:00.000Z",
"description": "Oil change",
"status": "pending"
}
```

### 📄 Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "status": 404,
  "message": "Customer not found",
  "stack": "Optional stack trace shown only in development"
}
```

### 🛠️ Running Tests

To run the tests for this API, ensure you have installed the necessary dependencies and run:

```bash
npm run test
```

### 🗣️ Contact

For more information or queries about the project, feel free to reach out.

### Happy coding! 🚴‍♂️
