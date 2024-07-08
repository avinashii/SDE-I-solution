# Image Processing Service API Documentation

## 1. Upload API

Accepts a CSV file, validates its format, and initiates asynchronous image processing.

**Endpoint:** `/api/upload`
**Method:** POST

### Request
- **Content-Type:** multipart/form-data
- **Body:** 
  - `file`: CSV file (required)

### Response
- **Status Code:** 200 OK
- **Body:**
  ```json
  {
    "requestId": "string",
    "message": "File uploaded successfully. Processing initiated."
  }

### Error Response

400 Bad Request: If the file is missing or not in CSV format
422 Unprocessable Entity: If the CSV file fails validation

## 1. Status API


Allows users to check the processing status of their upload request.
**Endpoint:**: /api/status/{requestId}
**Method:** GET

**Parameter:** requestId: string (required, path parameter)

### Response

- **Status Code:** 200 OK
- **Body:**
```json
  {
    
  "requestId": "string",
  "status": "string", // e.g., "pending", "processing", "createdAt": Data
  "productStatus": "products" // percentage of completion (0-100)

  }

### Error Response
404 Not Found: If the requestId is invalid or not found

3. Webhook Endpoint (Bonus)

# Webhook Documentation

## Overview

This webhook endpoint is designed to receive status updates for image processing requests. It updates the status of a request in the database based on the received information.

## Endpoint

**URL**: `/api/webhook/:requestId`
**Method**: POST

## Request

### URL Parameters

- `requestId`: The unique identifier of the request to update

### Headers

- `Content-Type`: application/json

### Body

```json
{
  "status": "string"
}


Response
Success Response
Code: 200 OK
Content:
{
  "message": "Request webhook processed successfully"
}


Error Responses
Request Not Found
Code: 404 Not Found
Content:
{
  "error": "Request not found"
}
Server Error
Code: 500 Internal Server Error
Content:
{
  "error": "Internal server error"
}