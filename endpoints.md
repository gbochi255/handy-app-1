# Handy App API Documentation

This document provides comprehensive documentation for all API endpoints in the Handy App backend. It includes usage information, example request JSON, and example response JSON for each endpoint.

## Table of Contents

- [User Endpoints](#user-endpoints)
  - [Register User](#register-user)
  - [Login User](#login-user)
  - [Update Provider Status](#update-provider-status)
- [Job Endpoints](#job-endpoints)
  - [Get All Jobs](#get-all-jobs)
  - [Get Client Jobs](#get-client-jobs)
  - [Get Job by ID](#get-job-by-id)
  - [Get Provider Jobs](#get-provider-jobs)
  - [Get Provider Bids](#get-provider-bids)
  - [Get Provider Won Jobs](#get-provider-won-jobs)
  - [Create Job](#create-job)
  - [Place Bid on Job](#place-bid-on-job)
  - [Mark Job as Complete](#mark-job-as-complete)
  - [Accept Bid for Job](#accept-bid-for-job)
- [Bid Endpoints](#bid-endpoints)
  - [Get Bids for Job](#get-bids-for-job)

## User Endpoints

### Register User

**Endpoint:** `POST /register`

**Usage:** Register a new user in the system. Required fields include email, password, firstname, and lastname. The email must be unique and in a valid format. The password must be at least 6 characters long.

**Screens used:** 
- user sign up

**Example Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword",
  "firstname": "John",
  "lastname": "Doe",
  "address": "123 Main St",
  "city": "Manchester",
  "postcode": "M1 1AA",
  "about_me": "Experienced handyman with 10 years of experience",
  "avatar_url": "https://example.com/avatar.jpg",
  "latitude": 53.4808,
  "longitude": -2.2426
}
```

**Example Response:**
```json
{
  "user_id": 1,
  "email": "john.doe@example.com",
  "password": "securepassword",
  "firstname": "John",
  "lastname": "Doe",
  "address": "123 Main St",
  "city": "Manchester",
  "postcode": "M1 1AA",
  "about_me": "Experienced handyman with 10 years of experience",
  "avatar_url": "https://example.com/avatar.jpg",
  "is_provider": false,
  "location_wkt": "POINT(-2.2426 53.4808)"
}
```

**Error Responses:**
- 400: Missing required fields
- 400: Invalid email format
- 400: Password too short
- 409: Email address already exists

### Login User

**Endpoint:** `POST /login`

**Usage:** Authenticate a user with their email and password.

**Screens used:** 
- user signup

**Example Request:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Example Response:**
```json
{
  "user_id": 1,
  "email": "john.doe@example.com",
  "firstname": "John",
  "lastname": "Doe",
  "address": "123 Main St",
  "city": "Manchester",
  "postcode": "M1 1AA",
  "about_me": "Experienced handyman with 10 years of experience",
  "avatar_url": "https://example.com/avatar.jpg",
  "is_provider": false
}
```

**Error Responses:**
- 400: Missing credentials
- 401: Invalid email or password

### Update Provider Status

**Endpoint:** `PATCH /users/:user_id`

**Usage:** Update a user's provider status. This endpoint allows toggling a user between being a service provider and a regular user.

**Screens used:** 
- become a provider


**Example Request:**
```json
{
  "isProvider": true
}
```

**Example Response:**
```json
{
  "user_id": 1,
  "email": "john.doe@example.com",
  "firstname": "John",
  "lastname": "Doe",
  "address": "123 Main St",
  "city": "Manchester",
  "postcode": "M1 1AA",
  "about_me": "Experienced handyman with 10 years of experience",
  "avatar_url": "https://example.com/avatar.jpg",
  "is_provider": true
}
```

**Error Responses:**
- 404: User not found

## Job Endpoints

### Get All Jobs

**Endpoint:** `GET /jobs`

**Usage:** Retrieve all jobs with optional filtering by creator and status.

NOTE: This endpoint is largely superceeded by /jobs/client & /jobs/provider. I've kept it "just in case".

**Query Parameters:**
- `created_by` (optional): Filter jobs by creator user ID
- `status` (optional): Filter jobs by status (open, in_progress, closed, expired)

**Example Request:**
```
GET /jobs?created_by=1&status=open
```

**Example Response:**
```json
{
  "jobs": [
    {
      "job_id": 1,
      "summary": "Fix leaking faucet",
      "job_detail": "The kitchen faucet is leaking and needs to be fixed or replaced",
      "category": "plumbing",
      "created_by": 1,
      "photo_url": "https://example.com/faucet.jpg",
      "status": "open",
      "date_posted": "2025-04-20T10:00:00.000Z",
      "target_date": "2025-04-25T10:00:00.000Z"
    },
    {
      "job_id": 2,
      "summary": "Paint bedroom",
      "job_detail": "Need to paint a 12x14 bedroom, walls only",
      "category": "painting",
      "created_by": 1,
      "photo_url": "https://example.com/bedroom.jpg",
      "status": "open",
      "date_posted": "2025-04-21T10:00:00.000Z",
      "target_date": "2025-04-28T10:00:00.000Z"
    }
  ]
}
```

### Get Client Jobs

**Endpoint:** `GET /jobs/client`

**Screens used:** 
- Client home screen

**Usage:** Retrieve jobs created by a specific client, with optional status filtering. Also includes bid count and best (lowest) bid amount.

**Query Parameters:**
- `client_id` (optional): Filter jobs by client user ID
- `status` (optional): Filter jobs by status (open, in_progress, closed, expired)

**Example Request:**
```
GET /jobs/client?client_id=1&status=open
```

**Example Response:**
```json
{
  "jobs": [
    {
      "job_id": 1,
      "summary": "Fix leaking faucet",
      "job_detail": "The kitchen faucet is leaking and needs to be fixed or replaced",
      "category": "plumbing",
      "created_by": 1,
      "photo_url": "https://example.com/faucet.jpg",
      "status": "open",
      "date_posted": "2025-04-20T10:00:00.000Z",
      "target_date": "2025-04-25T10:00:00.000Z",
      "bid_count": "2",
      "best_bid": "50.00"
    },
    {
      "job_id": 2,
      "summary": "Paint bedroom",
      "job_detail": "Need to paint a 12x14 bedroom, walls only",
      "category": "painting",
      "created_by": 1,
      "photo_url": "https://example.com/bedroom.jpg",
      "status": "open",
      "date_posted": "2025-04-21T10:00:00.000Z",
      "target_date": "2025-04-28T10:00:00.000Z",
      "bid_count": "1",
      "best_bid": "120.00"
    }
  ]
}
```

### Get Job by ID

**Endpoint:** `GET /jobs/:job_id`

**Screens used:** 
- Client job page
- Provider job detail

**Usage:** Retrieve detailed information about a specific job by its ID.

**Example Request:**
```
GET /jobs/1
```

**Example Response:**
```json
{
  "job_id": 1,
  "summary": "Fix leaking faucet",
  "job_detail": "The kitchen faucet is leaking and needs to be fixed or replaced",
  "category": "plumbing",
  "created_by": 1,
  "photo_url": "https://example.com/faucet.jpg",
  "status": "open",
  "date_posted": "2025-04-20T10:00:00.000Z",
  "target_date": "2025-04-25T10:00:00.000Z",
  "location_wkt": "POINT(-2.2426 53.4808)"
}
```

**Error Responses:**
- 404: Job ID not found

### Get Provider Jobs

**Endpoint:** `GET /jobs/provider/:provider_id`

**Screens used:** 
- Provider - view all available jobs

**Usage:** Retrieve jobs available to a specific provider, filtered by distance and optionally by status. Jobs are sorted by distance from the provider's location.

**URL Parameters:**
- `provider_id`: The ID of the provider

**Query Parameters:**
- `distance` (optional): Maximum distance in miles (default: 10)
- `status` (optional): Filter jobs by status (open, in_progress, closed, expired)

**Example Request:**
```
GET /jobs/provider/2?distance=5&status=open
```

**Example Response:**
```json
{
  "jobs": [
    {
      "job_id": 1,
      "summary": "Fix leaking faucet",
      "job_detail": "The kitchen faucet is leaking and needs to be fixed or replaced",
      "category": "plumbing",
      "created_by": 1,
      "photo_url": "https://example.com/faucet.jpg",
      "status": "open",
      "date_posted": "2025-04-20T10:00:00.000Z",
      "target_date": "2025-04-25T10:00:00.000Z",
      "distance": 1.234
    },
    {
      "job_id": 2,
      "summary": "Paint bedroom",
      "job_detail": "Need to paint a 12x14 bedroom, walls only",
      "category": "painting",
      "created_by": 1,
      "photo_url": "https://example.com/bedroom.jpg",
      "status": "open",
      "date_posted": "2025-04-21T10:00:00.000Z",
      "target_date": "2025-04-28T10:00:00.000Z",
      "distance": 2.345
    }
  ]
}
```

**Error Responses:**
- 404: User ID not found
- 404: User is not a provider
- 400: Distance must be a positive number
- 400: Invalid status value

### Get Provider Bids

**Endpoint:** `GET /jobs/provider/:provider_id/bids`

**Screens used:** 
- Provider - view my Bids

**Usage:** Retrieve all bids made by a specific provider, along with their status (Waiting, Lost, Unknown).

**URL Parameters:**
- `provider_id`: The ID of the provider

**Example Request:**
```
GET /jobs/provider/2/bids
```

**Example Response:**
```json
{
  "jobs": [
    {
      "job_id": 1,
      "summary": "Fix leaking faucet",
      "job_detail": "The kitchen faucet is leaking and needs to be fixed or replaced",
      "category": "plumbing",
      "created_by": 1,
      "photo_url": "https://example.com/faucet.jpg",
      "status": "open",
      "date_posted": "2025-04-20T10:00:00.000Z",
      "target_date": "2025-04-25T10:00:00.000Z",
      "distance": 1.234,
      "bid_status": "Waiting"
    },
    {
      "job_id": 3,
      "summary": "Install ceiling fan",
      "job_detail": "Need to install a ceiling fan in the living room",
      "category": "electrical",
      "created_by": 3,
      "photo_url": "https://example.com/fan.jpg",
      "status": "completed",
      "date_posted": "2025-04-18T10:00:00.000Z",
      "target_date": "2025-04-22T10:00:00.000Z",
      "distance": 3.456,
      "bid_status": "Lost"
    }
  ]
}
```

**Error Responses:**
- 404: User ID not found
- 404: User is not a provider

### Get Provider Won Jobs

**Endpoint:** `GET /jobs/provider/:provider_id/won`

**Screens used:** 
- Provider - view jobs I've won

**Usage:** Retrieve all jobs where a specific provider's bid was accepted, along with their progress status (Pending, Done, Unknown).

**URL Parameters:**
- `provider_id`: The ID of the provider

**Example Request:**
```
GET /jobs/provider/2/won
```

**Example Response:**
```json
{
  "jobs": [
    {
      "job_id": 4,
      "summary": "Fix toilet",
      "job_detail": "Toilet is running continuously and needs to be fixed",
      "category": "plumbing",
      "created_by": 3,
      "photo_url": "https://example.com/toilet.jpg",
      "status": "accepted",
      "date_posted": "2025-04-15T10:00:00.000Z",
      "target_date": "2025-04-20T10:00:00.000Z",
      "distance": 2.789,
      "job_progress": "Pending"
    },
    {
      "job_id": 5,
      "summary": "Install light fixture",
      "job_detail": "Need to install a new light fixture in the dining room",
      "category": "electrical",
      "created_by": 1,
      "photo_url": "https://example.com/light.jpg",
      "status": "completed",
      "date_posted": "2025-04-10T10:00:00.000Z",
      "target_date": "2025-04-15T10:00:00.000Z",
      "distance": 1.567,
      "job_progress": "Done"
    }
  ]
}
```

**Error Responses:**
- 404: User ID not found
- 404: User is not a provider

### Create Job

**Endpoint:** `POST /jobs/create`

**Screens used:** 
- Client - Home screen (add job button)

**Usage:** Create a new job posting. The job's location is automatically set to the creator's location.

**Example Request:**
```json
{
  "summary": "Fix leaking faucet",
  "job_detail": "The kitchen faucet is leaking and needs to be fixed or replaced",
  "category": "plumbing",
  "created_by": 1,
  "photo_url": "https://example.com/faucet.jpg",
  "target_date": "2025-04-25T10:00:00.000Z",
  "postcode": "M1 1AA"
}
```

**Example Response:**
```json
{
  "job_id": 1,
  "summary": "Fix leaking faucet",
  "job_detail": "The kitchen faucet is leaking and needs to be fixed or replaced",
  "category": "plumbing",
  "created_by": 1,
  "photo_url": "https://example.com/faucet.jpg",
  "status": "open",
  "date_posted": "2025-04-23T10:15:00.000Z",
  "target_date": "2025-04-25T10:00:00.000Z",
  "location_wkt": "POINT(-2.2426 53.4808)"
}
```

**Error Responses:**
- 400: Required parameters missing from body
- 404: User not found or no location set

### Place Bid on Job

**Endpoint:** `POST /jobs/:job_id/bid`

**Screens used:** 
- Provider - Job details (place bid button)

**Usage:** Place a bid on a specific job.

**URL Parameters:**
- `job_id`: The ID of the job to bid on

**Example Request:**
```json
{
  "amount": 50.00,
  "provider_id": 2
}
```

**Example Response:**
```json
{
  "bid_id": 1,
  "job_id": 1,
  "provider_id": 2,
  "amount": 50.00,
  "status": "pending",
  "created_at": "2025-04-23T10:20:00.000Z"
}
```

**Error Responses:**
- 400: Missing required parameters (amount, provider_id)

### Mark Job as Complete

**Endpoint:** `PATCH /jobs/:job_id/complete`

**Screens used:** 
- Client job page? (no wireframe)

**Usage:** Mark a job as completed.

**URL Parameters:**
- `job_id`: The ID of the job to mark as complete

**Example Request:**
```
PATCH /jobs/1/complete
```

**Example Response:**
```json
{
  "job_id": 1,
  "summary": "Fix leaking faucet",
  "job_detail": "The kitchen faucet is leaking and needs to be fixed or replaced",
  "category": "plumbing",
  "created_by": 1,
  "photo_url": "https://example.com/faucet.jpg",
  "status": "completed",
  "date_posted": "2025-04-20T10:00:00.000Z",
  "target_date": "2025-04-25T10:00:00.000Z",
  "completion_date": "2025-04-23T10:25:00.000Z"
}
```

**Error Responses:**
- 404: Job not found

### Accept Bid for Job

**Endpoint:** `PATCH /jobs/:job_id/accept/:bid_id`

**Screens used:** 
- Client - Bid detail

**Usage:** Accept a specific bid for a job. This will mark the accepted bid as 'accepted' and all other bids for the job as 'rejected'.

**URL Parameters:**
- `job_id`: The ID of the job
- `bid_id`: The ID of the bid to accept

**Example Request:**
```
PATCH /jobs/1/accept/2
```

**Example Response:**
```json
[
  {
    "bid_id": 1,
    "job_id": 1,
    "provider_id": 2,
    "amount": 50.00,
    "status": "rejected",
    "created_at": "2025-04-21T10:00:00.000Z"
  },
  {
    "bid_id": 2,
    "job_id": 1,
    "provider_id": 3,
    "amount": 60.00,
    "status": "accepted",
    "created_at": "2025-04-22T10:00:00.000Z"
  }
]
```

**Error Responses:**
- 404: Job not found
- 404: Bid not found

## Bid Endpoints

### Get Bids for Job

**Endpoint:** `GET /bids/:job_id`

**Screens used:** 
- Client - Job details page

**Usage:** Retrieve all bids for a specific job, including provider information.

**URL Parameters:**
- `job_id`: The ID of the job

**Example Request:**
```
GET /bids/1
```

**Example Response:**
```json
{
  "bids": [
    {
      "bid_id": 1,
      "provider_id": 2,
      "amount": 50.00,
      "status": "pending",
      "pr_firstname": "Jane",
      "pr_lastname": "Smith",
      "avatar_url": "https://example.com/jane.jpg",
      "created_at": "2025-04-21T10:00:00.000Z"
    },
    {
      "bid_id": 2,
      "provider_id": 3,
      "amount": 60.00,
      "status": "pending",
      "pr_firstname": "Bob",
      "pr_lastname": "Johnson",
      "avatar_url": "https://example.com/bob.jpg",
      "created_at": "2025-04-22T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- 404: JobId not found
