# Castor Oil Ordering Platform

## Project Overview

A microservices-based Castor Oil ordering platform where customers can:

* Register and Login
* Place Castor Oil Orders
* Make Payments using Stripe
* Receive Order Confirmation
* Track Order Status

Owners can:

* View all orders
* Update order status
* Manage business operations

---

# Technology Stack

## Backend

* FastAPI
* SQLAlchemy
* Alembic
* PostgreSQL
* Pydantic

## Authentication

* JWT Authentication
* Role-Based Access Control (RBAC)
* Refresh Tokens

## Payment

* Stripe Checkout
* Stripe Webhooks

## Frontend (Planned)

* ReactJS
* TailwindCSS

## Deployment (Planned)

* Docker
* Render
* Vercel

## DevOps (Planned)

* GitHub Actions
* Kubernetes

---

# Architecture

Frontend

↓

Auth Service

↓

Order Service

↓

Payment Service

↓

Notification Service

↓

PostgreSQL

---

# Microservices

## Auth Service

Port: 8000

Responsibilities:

* Signup
* Login
* JWT Generation
* JWT Validation
* Refresh Tokens
* Role Management

Implemented:

* User Model
* JWT Authentication
* Password Hashing
* Current User Endpoint
* Role-Based Access

Status: Completed

---

## Order Service

Port: 8001

Responsibilities:

* Create Orders
* View Orders
* Update Status
* Ownership Verification

Implemented:

* Order Model
* Create Order API
* My Orders API
* Get Order By ID
* Update Status API
* Owner Authorization

Status: Completed

---

## Payment Service

Port: 8002

Responsibilities:

* Stripe Checkout
* Payment Tracking
* Stripe Webhooks
* Order Status Updates

Implemented:

* Payment Model
* Checkout Session Creation
* Stripe Test Payments
* Webhook Verification
* Payment Status Update
* Order Status Update

Status: Completed

---

## Notification Service

Port: 8003

Responsibilities:

* Send Emails
* Order Notifications
* Payment Notifications

Status: Not Started

---

# Database Design

## Users Table

Fields:

* id
* full_name
* email
* password_hash
* role
* created_at

---

## Orders Table

Fields:

* id
* user_id
* quantity_litres
* delivery_date
* order_status
* price_per_litre
* total_amount

---

## Payments Table

Fields:

* id
* order_id
* user_id
* stripe_session_id
* amount
* payment_status

---

# Current Flow

Customer Login

↓

Create Order

↓

Order Status = PENDING

↓

Stripe Checkout

↓

Payment Success

↓

Stripe Webhook

↓

Payment Status = SUCCESS

↓

Order Status = PAID

---

# Completed Features

* Authentication Service
* Authorization Service
* Order Service
* Payment Service
* Stripe Integration
* Stripe Webhooks
* Database Migrations
* Service-to-Service Communication

---

# Next Steps

1. Notification Service
2. Email Templates
3. React Frontend
4. Dockerization
5. Docker Compose
6. Deployment (Render + Vercel)
7. GitHub Actions
8. Kubernetes

---

# Lessons Learned

* Microservice Architecture
* JWT Authentication
* RBAC
* Alembic Migrations
* Stripe Checkout
* Stripe Webhooks
* Service-to-Service Communication
* Order Ownership Verification
* API Design
